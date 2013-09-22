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
if ($_REQUEST['functionName'] == 'subscribe'){
subscribe($to, $name);
confirm_email($to);
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
function confirm_email($to)
{
    $from       = "congratulatinos@gmail.com";
    $subject    = "Mailing List";
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
The fact that you got this means you are on our email list. REJOICE.
</body>

}
