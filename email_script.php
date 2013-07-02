<?php
require_once('vendor/phpmailer/phpmailer/class.phpmailer.php');
if ($_REQUEST['functionName'] == 'email_songs') {
    $to = $_REQUEST['email'];
    echo $to;
    email_songs($to);
};
echo $_REQUEST;
if ($_REQUEST['functionName'] == 'email_songs_and_subscribe') {
    echo "what's up";
    $to = $_REQUEST['email'];
    $name = $_REQUEST['name'];
    subscribe($to, $name);
    email_songs($to);
};
function subscribe($to, $name){
echo "I made it in";
$emailFile = "/var/www/data/emails.txt";
$emailfh = fopen($emailFile, 'ab') or die("can't open file");
fwrite($emailfh, $to.", ");
$nameFile = "/var/www/data/names.txt";
$namefh = fopen($nameFile, 'ab') or die("can't open file");
fwrite($namefh, $name.", ");
$formatted = "\"".$name."\" <".$to.">, ";
$formattedFile = "/var/www/data/formatted.txt";
$formattedfh = fopen($formattedFile, 'ab') or die("can't open file");
fwrite($formattedfh, $formatted); 
};
function email_songs($to)
{
    $from       = "congratulatinos@gmail.com";
    $subject    = "Congratulatinos!";
    $body       = "<head>

<style>

body {

font-family: \"HelveticaNeueLight\", \"HelveticaNeue-Light\", \"Helvetica Neue Light\", \"HelveticaNeue\", \"Helvetica Neue\", \"TeXGyreHerosRegular\", \"Helvetica\", \"Tahoma\", \"Geneva\", \"Arial\", sans-serif;

font-weight:300;

font-stretch:expanded;



}
a {
  color: #900;
  text-decoration: none;
}

a:hover {
  color: red;
  position: relative;
}

</style>

<title>Test Mail</title>

</head>

<body>

<p>Shareable links, smallest to largest file size:</p>

<a href='https://dl.dropboxusercontent.com/u/18847953/Congratulatinos%20-%20Congratulatinos%21%20%282013%29%20%5BLAME%20MP3%20V2%5D.zip'>MP3 V2</a> <br>
<a href='https://dl.dropboxusercontent.com/u/18847953/Congratulatinos%20-%20Congratulatinos%21%20%282013%29%20%5BLAME%20MP3%20V0%5D.zip'>MP3 V0</a> <br>
<a href='https://dl.dropboxusercontent.com/u/18847953/Congratulatinos%20-%20Congratulatinos%21%20%282013%29%20%5BLAME%20MP3%20320%5D.zip'>MP3 320</a> <br>
<a href='https://dl.dropboxusercontent.com/u/18847953/Congratulatinos%20-%20Congratulatinos%21%20%282013%29%20%5BFLAC%5D.zip'>FLAC</a>
<hr>
<h3> Thanks to: </h3>



<a href='http://houseboatt.bandcamp.com' title='Drums on &quot;Cloudbreak&quot; and &quot;Protocholic&quot;, coined &quot;Congratulatinos&quot;'>Ryan Decker</a> <br>

<a href='http://www.youtube.com/user/lawrencepiano100?feature=watch' title='Guest pianist for &quot;Underwater Voyage&quot;'>Lawrence (Liang-Hui) Chu</a><br>

<a href='https://www.facebook.com/JamesNevilleArt' title='Created album art'>James Neville</a> <br>

<a href='http://saintjulien.bandcamp.com' title='&quot;Sunnnnn&quot; vocals on &quot;How You Want It&quot;'>Amanda Glasser</a> <br>

<a href='https://myspace.com/tenelevenths' title='Co-wrote bass on &quot;Cloudbreak&quot;'>Roderick Lauver</a> <br>

<a href='http://trur.org/background' title='Drums on &quot;Bitter Sunset Red&quot;, claps on &quot;Carmen&quot;'>Richard Whalley</a> <br>

<a title='Helped with album art'> Wenning Xu</a>, <a href='http://vimeo.com/sebastianhernandez' title='Helped with album art'>Sebastian Hernandez</a>, <a title='Helped with album art'>Brendan Fay</a>  <br>

<a href='http://static.megafrock.com' title='Helped with the website'>Max DeLiso</a> and <a href='https://github.com/boxcarton'  title='Helped with the website'>Josh Zheng</a><br>

<a title='inadvertent kitchen noises on &quot;Protocholic&quot;, Noise toleration'>DLu</a> <br>

<a href='http://www.drewmazurek.com' title='Mix Engineer'>Drew Mazurek</a> <br>

<hr>

<h3>Further Thanks to: </h3>

<a title='In addition to the main ones (creation, nourishment, education) - for their trust and understanding'>MOM and PAPA (Evelyn and Victor DeLiso)</a> <br>

<a title='Por todo'>Mami and Papi (Patricia and Sergio Ardila)</a> <br>

<a href='https://soundcloud.com/gilliangrogan' title='Got us in the loop'>Gillian Grogan</a><br>

<a href='http://www.acesofmusic.com' title='Instilled a love of harmony'>The Aces</a>, <a href='http://web1.johnshopkins.edu/octopodes' title='Instilled a love of harmony'>JHU Octopodes</a>, <a href='http://itn.mbhs.edu' title='Instilled a love of harmony'>InToneNation</a><br>
<a title='Noise toleration'>Tippens</a><br>

<a title='Early guitar mentors'>Tim Wenck, Gary Kao, Shivank Gupta, Alex McAbee</a><br>


<a>Luke Klingensmith</a><br>

<a href='http://www.leosvirsky.com/' title='Played me &quot;Climbing Up The Walls&quot; in middle school'>Leo Svirsky</a> <br>
<a href='http://www.dnr.state.md.us/publiclands/western/greenridgeforest.asp' title='Inspiration for and birthplace of &quot;Robber Barons&quot; and &quot;Protocholic&quot;'>Green Ridge State Forest</a> <br>

</body>

</html>
";

    $mail       = new PHPMailer();
    $mail->IsSMTP(true);            // use SMTP

    //$mail->SMTPDebug  = 2;        // enables SMTP debug information (for testing)
                                    // 1 = errors and messages
                                    // 2 = messages only
    $mail->SMTPAuth   = true;                  // enable SMTP authentication
    $mail->Host       = "tls://email-smtp.us-east-1.amazonaws.com"; // Amazon SES server, note "tls://" protocol
    $mail->Port       = 465;                    // set the SMTP port
    $mail->Username   = "AKIAJ67TTPIBW2QGLLKQ";  // SES SMTP  username
    $mail->Password   = "ApYOnDy8yTk4FQJ23eRDSAkk8NPBZPN2umsl4sXRMl8I";  // SES SMTP password

    $mail->SetFrom($from, 'Congratulatinos');
    $mail->AddReplyTo($from,'Congratulatinos');
    $mail->Subject    = $subject;
    $mail->MsgHTML($body);
    $address = $to;
    $mail->AddAddress($address, $to);
    if(!$mail->Send()) {
      echo "Mailer Error: " . $mail->ErrorInfo;
    } else {
      echo "Message sent!";
    } 
};
    

    
?>
