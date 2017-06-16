<?php

$comicsDBFile = '/Users/ondrejsirek/NetBeansProjects/KomiksoveNoviny/js/comicsDB.js';

$comicsDownloadedSource = file_get_contents($comicsDBFile);

$comicsDownloaded = json_decode(str_replace('var comicsDownloaded = ', '', $comicsDownloadedSource));

$comicsNum = 10;
        
$added = 0;
$download = 0;
$checkImages = 0;

$source = file_get_contents('https://comicsdb.cz/comicslist.php');

preg_match_all('/comics.php\?id=([0-9]+)/', $source, $matches, PREG_OFFSET_CAPTURE);

$comics = [];

foreach($matches[0] as $link) {
    $comics[] = $link[0];
}

$comicsLength = count($comics);

for($x = count($comics) - 1; $x >= 0 && $download < $comicsNum; $x--) {
    
    $comicsItem = $comics[$x];
    
    $find = array_filter($comicsDownloaded, function ($e) use (&$comicsItem) {
        return $e->url == $comicsItem;
    });

    $index = $x;
    
    if($find !== null) {
        $find = reset($find);
        if(isset($find->cover)) {
            $contentType = get_headers("https://comicsdb.cz" . $find->cover, 1)["Content-Type"];
        }
        else {
            $contentType = "";
        }
    }
    else {
        $contentType = "";
    }
    $checkImages++;
    
    if($find !== null && $contentType === "image/jpeg") {
        $comics[$index] = null;
    }
    
    if($checkImages === $comicsLength) {
        
        for($i = count($comics) - 1; $i >= 0 && $download < $comicsNum; $i--) {
            if($comics[$i] === null) unset($comics[$i]);
        }
        
        $comics = array_values($comics);

        if(count($comics) < $comicsNum) $comicsNum = count($comics);
        
        for($i = count($comics) - 1; $i >= 0 && $download < $comicsNum; $i--) {

            $download++;

            $comicsSource = file_get_contents('https://comicsdb.cz/' . $comics[$i]);
            $comicsSource =  iconv('windows-1250', 'utf-8', $comicsSource);
            
            $comicsSource = preg_replace('/(\r\n|\n|\r)/', "", $comicsSource);

            if(strpos($comicsSource, 'data-title="Obálka"><img src="') > 0 && strpos($comicsSource, '" alt="Obálka"') > 0) {
                $cover = substr($comicsSource, strpos($comicsSource, 'data-title="Obálka"><img src="') + 31, strpos($comicsSource, '" alt="Obálka"') - strpos($comicsSource, 'data-title="Obálka"><img src="') - 31);
            }
            else if(strpos($comicsSource, 'data-title="Obálka české verze"><img src="') > 0 && strpos($comicsSource, '" alt="Obálka české verze"') > 0) {
                $cover = substr($comicsSource, strpos($comicsSource, 'data-title="Obálka české verze"><img src="') + 45, strpos($comicsSource, '" alt="Obálka české verze"') - strpos($comicsSource, 'data-title="Obálka české verze"><img src="') - 45);
            }
            else {
                $cover = "";
            }
            
            $name = substr($comicsSource, strpos($comicsSource, '<H5>') + 4, strpos($comicsSource, '</H5>') - strpos($comicsSource, '<H5>') - 4);
            
            preg_match_all('/Vydal:((?!<br \/>).)*<br \/>/', $comicsSource, $matches, PREG_OFFSET_CAPTURE);
            $publisher = $matches !== null && isset($matches[0][0][0]) ? trim(substr($matches[0][0][0], strpos($matches[0][0][0], "</span>") + 7, strpos($matches[0][0][0], "<br />") - strpos($matches[0][0][0], "</span>") - 7)) : "";
            $publisher = preg_replace('/<a((?!<\/).)*>/', "", preg_replace('/<\/a>/', "", $publisher));
            
            preg_match_all('/Rok a měsíc vydání:((?!<br \/>).)*<br \/>/', $comicsSource, $matches, PREG_OFFSET_CAPTURE);
            $publish = $matches !== null && isset($matches[0][0][0]) ? trim(substr($matches[0][0][0], strpos($matches[0][0][0], "</span>") + 7, strpos($matches[0][0][0], "<br />") - strpos($matches[0][0][0], "</span>") - 7)) : "";
            
            preg_match_all('/Vazba:((?!<br \/>).)*<br \/>/', $comicsSource, $matches, PREG_OFFSET_CAPTURE);
            $type = $matches !== null && isset($matches[0][0][0]) ? trim(substr($matches[0][0][0], strpos($matches[0][0][0], "</span>") + 7, strpos($matches[0][0][0], "<br />") - strpos($matches[0][0][0], "</span>") - 7)) : "";
            
            preg_match_all('/Format:((?!<br \/>).)*<br \/>/', $comicsSource, $matches, PREG_OFFSET_CAPTURE);
            $format = $matches !== null && isset($matches[0][0][0]) ? trim(substr($matches[0][0][0], strpos($matches[0][0][0], "</span>") + 7, strpos($matches[0][0][0], "<br />") - strpos($matches[0][0][0], "</span>") - 7)) : "";
            
            preg_match_all('/Počet stran:((?!<br \/>).)*<br \/>/', $comicsSource, $matches, PREG_OFFSET_CAPTURE);
            $pages = $matches !== null && isset($matches[0][0][0]) ? trim(substr($matches[0][0][0], strpos($matches[0][0][0], "</span>") + 7, strpos($matches[0][0][0], "<br />") - strpos($matches[0][0][0], "</span>") - 7)) : "";
            
            preg_match_all('/Cena v době vydání:((?!<br \/>).)*<br \/>/', $comicsSource, $matches, PREG_OFFSET_CAPTURE);
            $price = $matches !== null && isset($matches[0][0][0]) ? trim(substr($matches[0][0][0], strpos($matches[0][0][0], "</span>") + 7, strpos($matches[0][0][0], "<br />") - strpos($matches[0][0][0], "</span>") - 7)) : "";
            
            $comicsItem = [];
            $comicsItem["url"] = $comics[$i];
            $comicsItem["cover"] = $cover;
            $comicsItem["name"] = $name;
            $comicsItem["publisher"] = $publisher;
            $comicsItem["publish"] = $publish;
            $comicsItem["type"] = $type;
            $comicsItem["format"] = $format;
            $comicsItem["pages"] = $pages;
            $comicsItem["price"] = $price;

            $comicsUrl = $comics[$i];
            
            $find = array_filter($comicsDownloaded, function ($e) use (&$comicsUrl) {
                return isset($e->url) && $e->url == $comicsUrl;
            });
            
            if($find === null) {
                array_unshift($comicsDownloaded, $comicsItem);
            }
            else {
                $comicsDownloaded[reset(array_keys($find))] = $comicsItem;
            }

            $added++;

            if($added == ($comicsNum > -1 ? $comicsNum : count($comics))) {
                file_put_contents($comicsDBFile, "var comicsDownloaded = " . json_encode($comicsDownloaded));
                exec('git --git-dir=/Users/ondrejsirek/NetBeansProjects/KomiksoveNoviny/.git add . 2>&1', $output_text);
                exec('git --git-dir=/Users/ondrejsirek/NetBeansProjects/KomiksoveNoviny/.git commit -m "comics update" 2>&1', $output_text);
                exec('git --git-dir=/Users/ondrejsirek/NetBeansProjects/KomiksoveNoviny/.git push 2>&1', $output_text);
                echo "var comicsDownloaded = " . json_encode($comicsDownloaded);
            }
        }

        if($download == 0) {
            echo "var comicsDownloaded = " . json_encode($comicsDownloaded);
        }
        
    }
    
}

?>
