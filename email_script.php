<?php 
 $to = $_REQUEST['sendto'] ; 
 $from = $_REQUEST['Email'] ; 
 $name = $_REQUEST['Name'] ; 
 $headers = "From: $from"; 
 $subject = "Web Contact Data"; 
 
 $fields = array(); 
 $fields{"Name"} = "Name"; 
 $fields{"Company"} = "Company"; 
 $fields{"Email"} = "Email"; 
 $fields{"Phone"} = "Phone"; 
 $fields{"list"} = "Mailing List"; 
 $fields{"Message"} = "Message"; 
 
 $body = "Hi diego and marco this is tiffany from inside your computer:\n\n"; foreach($fields as $a => $b){ 	$body .= sprintf("%20s: %s\n",$b,$_REQUEST[$a]); }
 
 $headers2 = "From: congratulatinos@gmail.com";
 $subject2 = "Thank you for contacting us"; 
 $autoreply = "Hey Diego it's Ryan I am stuck inside a computer! I figured out how to use this webserver!"
 if($from == '') {print "You have not entered an email, please go back and try again";} 
 else { 
 if($name == '') {print "You have not entered a name, please go back and try again";} 
 else { 
 $send = mail($to, $subject, $body, $headers); 
 $send2 = mail($from, $subject2, $autoreply, $headers2); 
 if($send) 
 {header( "Location: http://www.google.com/" );}
 else 
 {print "We encountered an error sending your mail, please notify webmaster@YourCompany.com"; } 
 }
}
 ?> 