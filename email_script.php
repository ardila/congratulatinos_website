<?php
  require_once 'lib/swift_required.php';
 
  //Create the Transport
  $transport = new Swift_AWSTransport(
    'AKIAI266ZFDPXSSDRGAA',
    'xY1D4BkQ4QIQIisL0uTu4Bdw6LJJMY0nLUHglbh8'
  );
 
  //Create the Mailer using your created Transport
  $mailer = Swift_Mailer::newInstance($transport);
 
  //Create the message
  $message = Swift_Message::newInstance()
  ->setSubject("What up?")
  ->setFrom(array('congratulatinos@gmail.com'))
  ->setTo(array('congratulatinos@gmail.com'))
  ->setBody("
<p>
  Dude, I'm <b>totally</b> sending you email via AWS.
</p>
  ", 'text/html');
 
  $mailer->send( $message );
