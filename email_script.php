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
    $body       = "<html>
<head>
  <title>Test Mail</title>
</head>
<body>
    <p><a href='linktosongs'>Click to download</a><p>
    <h1> Thanks to: </h1>
    <a href='http://houseboatt.bandcamp.com/'>Ryan Decker</a>: Drums on Cloudbreak and Protocholic, coined 'Congratulatinos'<br>
    <a href='https://www.facebook.com/JamesNevilleArt'>James Neville</a>: Album art<br>
    <a href='saintjulien.bandcamp.com'>Amanda Glasser</a>: 'Sunn' vocals on 'How You Want It'<br>
    <a href='http://www.drewmazurek.com/Main.html'>Drew Mazurek</a>: Mix Engineer<br>
    <a href='https://myspace.com/tenelevenths'>Roderick Lauver</a>: Co-wrote bass on Cloudbreak<br>
    <a href='http://trur.org/background/'>Richard Whalley</a>: Drums on Bittersunset Red, claps on Carmen<br>
    Wenning Xu: helped with album art<br>
    <a href='https://soundcloud.com/gilliangrogan'>Gillian Grogan</a>: Got us in the loop<br>
    Max DeLiso and Josh Zheng: Helped with the website<br>
    DLu, Tippens: Noise toleration<br>
</body>
</html>";

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
