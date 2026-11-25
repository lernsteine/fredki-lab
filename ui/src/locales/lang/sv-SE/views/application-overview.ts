export default {
  title: 'Översikt',
  appInfo: {
    publicAccessLink: 'Offentlig URL',
    openText: 'På',
    closeText: 'Av',
    demo: 'Förhandsgranska',
    embedInWebsite: 'Hämta inbäddningskod',
    accessControl: 'Åtkomstkontroll',
    displaySetting: 'Visningsinställningar',
    apiAccessCredentials: 'API-åtkomstuppgifter',
    apiKey: 'API-nyckel',
    refreshToken: {
      msgConfirm1: 'Vill du verkligen generera om den offentliga URL:en?',
      msgConfirm2:
        'Om den offentliga URL:en genereras om påverkas befintliga inbäddningskoder på externa webbplatser. Du måste uppdatera inbäddningskoden och integrera den på nytt. Var försiktig!',
      refreshSuccess: 'Har uppdaterats',
    },
    APIKeyDialog: {
      saveSettings: 'Spara inställningar',
      msgConfirm1: 'Vill du verkligen radera API-nyckeln',
      msgConfirm2:
        'Åtgärden kan inte ångras. En raderad API-nyckel kan inte återställas. Vill du fortsätta?',
    },
    EmbedDialog: {
      fullscreenModeTitle: 'Helskärmsläge',
      copyInstructions: 'Kopiera koden nedan för att bädda in',
      floatingModeTitle: 'Flytande läge',
      mobileModeTitle: 'Mobilläge',
    },
    LimitDialog: {
      clientQueryLimitLabel: 'Frågegräns per klient',
      authentication: 'Autentisering',
      authenticationValue: 'Lösenordsåtkomst',
      timesDays: 'frågor per dag',
      whitelistLabel: 'Tillåtna domäner',
      whitelistPlaceholder:
        'Ange tillåtna externa domäner, en per rad. Till exempel:\nhttp://127.0.0.1:5678\nhttps://dataease.io',
      loginMethod: 'Inloggningsmetod',
      loginMethodRequired: 'Välj inloggningsmetod',
      toSettingChatUser: 'Gå till konfiguration av chattanvändare',
      displayCodeRequired: 'Ange antalet misslyckade försök',
      authenticationTooltip:
        'När inloggningsautentisering är aktiverad måste chattanvändare ha behörighet till både agenten och dess kopplade kunskapsbaser. Utan rätt behörighet kan användarna inte logga in eller använda sökning i kunskapsbaserna.',
    },
    SettingAPIKeyDialog: {
      allowCrossDomainLabel: 'Tillåt åtkomst mellan domäner',
      crossDomainPlaceholder:
        'Ange tillåtna adresser för åtkomst mellan domäner. Om funktionen är aktiverad men fältet lämnas tomt gäller inga begränsningar.\nEn per rad, t.ex.:\nhttp://127.0.0.1:5678\nhttps://dataease.io',
    },
  },
  SettingDisplayDialog: {
    showSourceLabel: 'Visa kunskapskälla',
    showExecutionDetail: 'Visa körningsdetaljer',
    restoreDefault: 'Återställ standard',
    customThemeColor: 'Anpassad temafärg',
    headerTitleFontColor: 'Teckenfärg för rubrik',
    default: 'Standard',
    askUserAvatar: 'Användarens avatar (frågor)',
    replace: 'Byt',

    imageMessage:
      'Rekommenderad storlek: 32×32 pixlar. Stöder JPG, PNG och GIF. Maxstorlek: 10 MB',
    AIAvatar: 'AI-avatar',
    display: 'Visa',
    floatIcon: 'Flytande ikon',
    iconDefaultPosition: 'Ikonens standardposition',
    iconPosition: {
      left: 'Vänster',
      right: 'Höger',
      bottom: 'Nederkant',
      top: 'Överkant',
    },
    draggablePosition: 'Flyttbar position',
    showHistory: 'Visa chatthistorik',
    displayGuide: 'Visa guidebild (flytande läge)',
    share: 'Tillåt delning av chattar',
    disclaimer: 'Ansvarsfriskrivning',
    disclaimerValue: 'Detta innehåll är AI-genererat och endast avsett som referens.',
    chatBackground: 'Chattbakgrund',
    chatBackgroundMessage: 'Format som stöds: JPG, PNG, GIF. Maxstorlek: 10 MB.',
  },
}
