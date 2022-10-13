function mySettings(props) {
  return (
    <Page>
      <Section title={<Text bold align="center">Ozo Settings</Text>}>
           <Toggle settingsKey="showAmPm" label="Show AM/PM indicator" />    
           <Toggle settingsKey="showDate" label="Show Date" />    
         </Section>        
      
      
        
       <Section title={<Text bold align="center">Donate!</Text>}>
      
      <Text italic>If you like this clockface and would like to see it further developed as well as other wonderful Ionic apps and faces created, please know - I run on coffee. It's an essential fuel for inspiration and creativity. So feel free to donate so I won't run out of fuel :) Thanks!
         </Text>
      
      <Link source="https://paypal.me/yuriygalanter">YURIY'S COFFEE FUND</Link> 
         
         </Section>   
      
      
    </Page>
  );
}

registerSettingsPage(mySettings);