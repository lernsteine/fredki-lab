export default {
  title: 'Agent',
  createApplication: 'Skapa enkel agent',
  createWorkFlowApplication: 'Skapa arbetsflödesagent',
  importApplication: 'Importera agent',
  copyApplication: 'Kopiera agent',
  batchClearStrategyTip:
    'Åtgärden uppdaterar rensningspolicyn för chattloggar för alla valda agenter.',
  simple: 'ENKEL',
  senior: 'ARBETSFLÖDE',
  simpleAgent: 'Enkel agent',
  AdvancedAgent: 'Avancerad agent',
  simplePlaceholder: 'Bygg snabbt intelligenta agenter med grundfunktioner via formulärinställningar',
  advancedPlaceholder:
    'Orkestrera flexibelt komplex logik och funktionsrika agenter med låg kod och dra-och-släpp',
  appTest: 'Felsökningsförhandsvisning',
  operation: {
    addModel: 'Lägg till modell',
    toChat: 'Chatta',
  },
  delete: {
    confirmTitle: 'Vill du verkligen radera agenten: ',
    confirmTitle2: 'agenter?',
    confirmMessage:
      'Om agenten raderas kommer dess tjänster inte längre att vara tillgängliga. Var försiktig.',
    resourceCountMessage:
      'Agenten är kopplad till {count} resurser som blir oanvändbara efter raderingen. Var försiktig.',
  },
  tip: {
    publishSuccess: 'Publicerad',
    ExportError: 'Exporten misslyckades',
    professionalMessage:
      'Community-utgåvan stöder upp till 5 agenter. Behöver du fler, uppgradera till Professional-utgåvan.',
    saveErrorMessage: 'Det gick inte att spara, kontrollera dina uppgifter eller försök igen senare',
    loadingErrorMessage: 'Det gick inte att läsa in konfigurationen, kontrollera dina uppgifter eller försök igen senare',
    noDocPermission: 'Ingen behörighet att skapa dokument',
    confirmUse: 'Vill du verkligen använda',
    overwrite: 'skriva över det aktuella arbetsflödet',
  },
  longTermMemory: {
    title: 'Långtidsminne',
    setting: 'Inställningar för långtidsminne',
    triggerType: 'Utlösartyp',
    roundTrigger: 'Utlösning per omgångar',
    roundTriggerTip:
      'När N omgångar har samlats extraheras N omgångar av konversationen automatiskt för att skapa minne',
    triggerInterval: 'Utlösningsintervall',
    scheduledTrigger: 'Tidsstyrd utlösning',
    scheduledTriggerTip:
      'När den inställda tiden nås extraheras alla konversationer inom cykeln automatiskt för att skapa minne',
    cronExpressionInvalid: 'Cron-uttrycket är ogiltigt',
    tips1: `När funktionen aktiveras registreras nya konversationer från aktiveringstidpunkten och minne skapas regelbundet, vilket kan användas via`,
    tips2: `variabler i systemprompten.
När funktionen inaktiveras rensas chattanvändarnas långtidsminne, och vid återaktivering börjar ackumuleringen om från aktiveringstidpunkten.`,
    defaultModel: 'Standardmodell',
    custom: 'Anpassad',
    modelRequiredMessage: 'Välj en modell för långtidsminne',
    modelSettingTip: 'Modellen kan konfigureras under "Inställningar för långtidsminne"',
  },
  form: {
    appName: {
      label: 'Agentens namn',
      placeholder: 'Ange agentens namn',
      requiredMessage: 'Agentens namn krävs',
    },
    appDescription: {
      placeholder:
        'Beskriv agentens scenario och användning, t.ex.: XXX-assistent som besvarar användarfrågor om hur produkten XXX används',
    },
    appType: {
      simplePlaceholder: 'Passar nybörjare som vill skapa en assistent.',
      workflowPlaceholder: 'Passar avancerade användare som vill anpassa assistentens arbetsflöde',
    },
    appTemplate: {
      blankApp: {
        title: 'Tom agent',
      },
      assistantApp: {
        title: 'Kunskapsassistent',
        description: 'Passar avancerade användare som vill anpassa assistentens arbetsflöde',
      },
    },
    aiModel: {
      label: 'AI-modell',
      placeholder: 'Välj en AI-modell',
    },
    roleSettings: {
      label: 'Systemprompt',
      placeholder:
        'Systemprompt, du kan referera till systemvariabler: {data} är segmentet som träffades i kunskapsbasen; {question} är användarens fråga, {memory} är användarens minne när långtidsminne är aktiverat.',
      tooltip: 'Ange rollen eller instruktionerna som modellen ska följa',
    },

    prompt: {
      label: 'Användarprompt',
      noReferences: '（Ingen referens till kunskapsbas）',
      references: ' (Refererar till kunskapsbas)',
      placeholder:
        'Användarprompt, du kan referera till systemvariabler: {data} är segmentet som träffades i kunskapsbasen; {question} är användarens fråga',
      requiredMessage: 'Ange användarprompt',
      tooltip: 'Frågan eller instruktionen som användaren ger modellen',

      noReferencesTooltip:
        'Genom att justera promptens innehåll kan du styra riktningen i chatten med språkmodellen. Prompten fixeras i början av kontexten. Variabler: {question} är användarens fråga.',
      referencesTooltip:
        'Genom att justera promptens innehåll kan du styra riktningen i chatten med språkmodellen. Prompten fixeras i början av kontexten. Variabler: {data} innehåller känd information från kunskapsbasen; {question} är användarens fråga.',
      defaultPrompt: `Känd information: {data}
        Fråga: {question}
         Krav på svaret:
         - Besvara användarens fråga med ett kortfattat och professionellt språk.
         `,
    },
    historyRecord: {
      label: 'Chatthistorik',
    },
    relatedKnowledge: {
      label: 'Kopplad kunskapsbas',
      placeholder: 'Kopplade kunskapsbaser visas här',
    },
    multipleRoundsDialogue: 'Dialog i flera omgångar',

    prologue: 'Inledning',
    defaultPrologue:
      'Hej, jag är XXX-assistenten. Du kan ställa frågor till mig om hur XXX används.\n- Vilka är huvudfunktionerna i XXX?\n- Vilka språkmodeller stöder XXX?\n- Vilka dokumenttyper stöder XXX?',
    problemOptimization: {
      label: 'Frågeoptimering',
      tooltip:
        'Optimera den aktuella frågan utifrån chatthistoriken så att den bättre matchar kunskapsbasen.',
    },

    voiceInput: {
      label: 'Röstinmatning',
      placeholder: 'Välj en modell för taligenkänning',
      requiredMessage: 'Välj en modell för röstinmatning',
      autoSend: 'Skicka automatiskt',
      defaultModel: 'Standardmodell',
      custom: 'Anpassad',
    },
    voicePlay: {
      label: 'Röstuppspelning',
      placeholder: 'Välj en modell för talsyntes',
      requiredMessage: 'Välj en modell för röstuppspelning',
      autoPlay: 'Spela upp automatiskt',
      browser: 'Uppspelning i webbläsaren (gratis)',
      tts: 'TTS-modell',
      listeningTest: 'Provlyssna',
      defaultModel: 'Standardmodell',
      custom: 'Anpassad',
    },
    reasoningContent: {
      label: 'Visa tankeprocess',
      tooltip:
        'Ange tankeprocessens taggar utifrån modellens svar. Innehållet mellan taggarna tolkas som tankeprocessen.',
      start: 'Start',
      end: 'Slut',
    },
    mcp_output_enable: 'Visa körningsprocess',
  },
  generateDialog: {
    label: 'Generera',
    generatePrompt: 'Generera prompt',
    placeholder: 'Ange promptens ämne',
    title: 'Prompten visas här',
    remake: 'Generera om',
    stop: 'Stoppa generering',
    continue: 'Fortsätt generera',
    replace: 'Ersätt',
    exit: 'Vill du verkligen avsluta och kasta det AI-genererade innehållet?',
    loading: 'Genererar...',
  },
  dialog: {
    addKnowledge: 'Lägg till kopplad kunskapsbas',
    addKnowledgePlaceholder: 'Valda kunskapsbaser måste använda samma embedding-modell',
    selectSearchMode: 'Sökläge',
    vectorSearch: 'Vektorsökning',
    vectorSearchTooltip:
      'Vektorsökning bygger på beräkning av vektoravstånd och passar stora datamängder i kunskapsbasen.',
    fullTextSearch: 'Fulltextsökning',
    fullTextSearchTooltip:
      'Fulltextsökning bygger på textlikhet och passar små datamängder i kunskapsbasen.',
    hybridSearch: 'Hybridsökning',
    hybridSearchTooltip:
      'Hybridsökning bygger på både vektor- och textlikhet och passar medelstora datamängder i kunskapsbasen.',
    similarityThreshold: 'Likhet högre än',
    similarityTooltip: 'Ju högre likhet, desto starkare samband.',
    topReferences: 'Topp N segment',
    maxCharacters: 'Max antal tecken per referens',
    noReferencesAction: 'När det inte finns några referenser i kunskapsbasen',
    continueQuestioning: 'Fortsätt ställa frågan till AI-modellen',
    provideAnswer: 'Ange svarsinnehåll',
    designated_answer:
      'Hej, jag är XXX-assistenten. Min kunskap omfattar endast information om XXX-produkter. Formulera om din fråga.',
    defaultPrompt1:
      'Innehållet inom parenteserna () är användarens fråga. Utgå från kontexten och komplettera användarens fråga ({question}). Kravet är att skriva ut en fullständig fråga och placera den i',
    defaultPrompt2: 'taggen',
  },
  applicationAccess: {
    title: 'Tredjepartsåtkomst',
    wecom: 'WeCom',
    wecomTip: 'Skapa WeCom-agent',
    wecomBot: 'WeCom-bot',
    wecomBotTip: 'Skapa intelligent WeCom-bot',
    dingtalk: 'DingTalk',
    dingtalkTip: 'Skapa DingTalk-agent',
    wechat: 'WeChat',
    wechatTip: 'Skapa WeChat-agent',
    lark: 'Lark',
    larkTip: 'Skapa Lark-agent',
    setting: 'Inställningar',
    callback: 'Återanropsadress',
    callbackTip: 'Fyll i återanropsadressen',
    wecomPlatform: 'WeCom Open Platform',
    wechatPlatform: 'WeChat Open Platform',
    dingtalkPlatform: 'DingTalk Open Platform',
    larkPlatform: 'Lark Open Platform',
    slack: 'Slack',
    slackTip: 'Skapa Slack-agent',
    wecomSetting: {
      title: 'WeCom-konfiguration',
      cropId: 'Corp ID',
      cropIdPlaceholder: 'Ange corp ID',
      agentIdPlaceholder: 'Ange agent ID',
      secretPlaceholder: 'Ange secret',
      tokenPlaceholder: 'Ange token',
      encodingAesKeyPlaceholder: 'Ange EncodingAESKey',
      authenticationSuccessful: 'Lyckades',
      urlInfo:
        '-Apphantering-Egenutvecklad-Skapad app-Ta emot meddelanden-Ange "URL" som tas emot av API:et',
    },
    dingtalkSetting: {
      title: 'DingTalk-konfiguration',
      clientIdPlaceholder: 'Ange klient-ID',
      clientSecretPlaceholder: 'Ange klienthemlighet',
      urlInfo:
        '-På robotsidan, ställ in "Läge för meddelandemottagning" på HTTP och fyll i URL:en ovan som "Mottagningsadress för meddelanden"',
    },
    wechatSetting: {
      title: 'WeChat-konfiguration',
      appId: 'APP ID',
      appIdPlaceholder: 'Ange APP ID',
      appSecret: 'APP SECRET',
      appSecretPlaceholder: 'Ange APP SECRET',
      token: 'TOKEN',
      tokenPlaceholder: 'Ange TOKEN',
      aesKey: 'Krypteringsnyckel för meddelanden',
      aesKeyPlaceholder: 'Ange krypteringsnyckeln för meddelanden',
      urlInfo:
        '-Inställningar och utveckling-Grundkonfiguration-"Serveradress URL" i serverkonfigurationen',
    },
    wecomBotSetting: {
      title: 'Konfiguration av WeCom-bot',
      urlInfo: '-Hanteringsverktyg-Smart bot-Skapa bot-Skapa "URL" i API-läge',
    },
    larkSetting: {
      title: 'Lark-konfiguration',
      appIdPlaceholder: 'Ange APP ID',
      appSecretPlaceholder: 'Ange APP secret',
      verificationTokenPlaceholder: 'Ange verifieringstoken',
      urlInfo:
        '-Händelser och återanrop - händelsekonfiguration - konfigurera prenumerationsmetodens "begäransadress"',
    },
    slackSetting: {
      title: 'Slack-konfiguration',
      signingSecretPlaceholder: 'Ange signing secret',
      botUserTokenPlaceholder: 'Ange bot user token',
    },
    copyUrl: 'Kopiera länken och fyll i den',
  },
  hitTest: {
    title: 'Söktest',
    text: 'Testa kunskapsbasens träffsäkerhet med en given söktext.',
    emptyMessage1: 'Resultaten från söktestet visas här',
    emptyMessage2: 'Inga matchande avsnitt hittades',
  },
  publishTime: 'Publiceringstid',
  publishStatus: 'Publiceringsstatus',
}
