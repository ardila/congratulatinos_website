<?php
require_once('vendor/phpmailer/phpmailer/class.phpmailer.php');
    $to         = "headradio@gmail.com";
    $from       = "congratulatinos@gmail.com";
    $subject    = "a test subject";
    $body       = "Bitch I'm Paid. That's All I Gotta Say. I sent this bitch from AWS.";

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

    $mail->SetFrom($from, 'First Last');
    $mail->AddReplyTo($from,'First Last');
    $mail->Subject    = $subject;
    $mail->MsgHTML($body);
    $address = $to;
    $mail->AddAddress($address, $to);

    if(!$mail->Send()) {
      echo "Mailer Error: " . $mail->ErrorInfo;
    } else {
      echo "Message sent!";
    }
?>
