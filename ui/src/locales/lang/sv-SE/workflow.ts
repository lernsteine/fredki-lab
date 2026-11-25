export default {
  node: 'Nod',
  nodeName: 'Nodens namn',
  baseComponent: 'Grundläggande',
  nodeSetting: 'Nodinställningar',
  workflow: 'Arbetsflöde',
  knowledgeWorkflow: 'Kunskapsarbetsflöde',
  info: {
    previewVersion: 'Förhandsversion:',
    saveTime: 'Senast sparad:',
  },
  operation: {
    toImportDoc: 'Gå till dokumentimport',
    importWorkflow: 'Importera arbetsflöde',
    exportWorkflow: 'Exportera arbetsflöde',
  },
  setting: {
    restoreVersion: 'Återställ tidigare version',
    restoreCurrentVersion: 'Återställ till denna version',
    addComponent: 'Lägg till',
    releaseHistory: 'Publiceringshistorik',
    autoSave: 'Spara automatiskt',
    latestRelease: 'Senaste publicering',
    copyParam: 'Kopiera parametrar',
    debug: 'Kör',
    exit: 'Avsluta',
    exitSave: 'Spara och avsluta',
    templateCenter: 'Mallcenter',
    defaultModelSetting: 'Inställning för standardmodell',
    defaultModelSettingTip: 'Noder som har valt "Standardmodell" använder konfigurationen nedan.',
    defaultModelNotConfigured: 'Ingen standardmodell konfigurerad',
    defaultModelUnavailable: 'Standardmodellen är inte tillgänglig',
    defaultModelRequired: 'Ingen standardmodell av denna typ är konfigurerad',
    defaultModelMissing: 'standardmodellen för {modelType} är inte konfigurerad',
    applyToAll: 'Tillämpa på alla noder',
    apply: 'Tillämpa',
    applyToAllConfirmMsg: 'Alla noder får modellkällan "Standardmodell", vilket ersätter deras nuvarande inställningar "Anpassad/Referens". Var försiktig.',
    applyToAllSuccess: '{count} nod(er) har fått standardmodellen',
    applyToAllNone: 'Inga noder behöver ändras',
    defaultModelSettingUnsaved: 'Inställningarna för standardmodellen har ändrats. Spara ändringarna?',
    saveChanges: 'Spara ändringar',
    discardChanges: 'Spara inte',
    modelType: {
      LLM: 'AI-modell',
      TTS: 'TTS-modell',
      STT: 'STT-modell',
      IMAGE: 'Bildmodell',
      TTI: 'Modell för bildgenerering',
      TTV: 'Modell för text till video',
      ITV: 'Modell för bild till video',
      RERANKER: 'Omrankningsmodell',
    },
  },
  tip: {
    noData: 'Inga relevanta resultat hittades',
    nameMessage: 'Namnet får inte vara tomt!',
    onlyRight: 'Anslutningar kan endast göras från höger ankarpunkt',
    notRecyclable: 'Slingor är inte tillåtna',
    onlyLeft: 'Anslutningar kan endast göras till vänster ankarpunkt',
    applicationNodeError: 'Agenten är inte tillgänglig',
    toolNodeError: 'Verktygsnoden är inte tillgänglig',
    repeatedNodeError: 'Det finns redan en nod med detta namn',
    cannotCopy: 'Kan inte kopieras',
    copyError: 'Noden har redan kopierats',
    paramErrorMessage: 'Parametern finns redan: ',
    saveMessage: 'Aktuella ändringar har inte sparats. Spara innan du avslutar?',
    searchPlaceholder: 'Ange nodens namn',
    disabled: 'Noden har inaktiverats',
  },
  delete: {
    confirmTitle: 'Vill du radera noden?',
    deleteMessage: 'Noden kan inte raderas',
  },
  control: {
    zoomOut: 'Zooma ut',
    zoomIn: 'Zooma in',
    fitView: 'Anpassa till skärmen',
    retract: 'Fäll ihop alla',
    extend: 'Expandera alla',
    beautify: 'Ordna automatiskt',
  },
  variable: {
    global: 'Global variabel',
    chat: 'Chattvariabel',
    Referencing: 'Refererad variabel',
    ReferencingRequired: 'Refererad variabel krävs',
    ReferencingError: 'Ogiltig refererad variabel',
    NoReferencing: 'Den refererade variabeln finns inte',
    placeholder_key: 'Ange nyckel',
    placeholder: 'Välj en variabel',
    inputPlaceholder: 'Ange variabel',
    loop: 'Slingvariabel',
  },
  condition: {
    title: 'Körningsvillkor',
    front: 'Förutsättning',
    AND: 'Alla',
    OR: 'Någon',
    text: 'Kör den aktuella noden när den anslutna noden har körts',
  },
  validate: {
    startNodeRequired: 'Startnod krävs',
    startNodeOnly: 'Endast en startnod är tillåten',
    baseNodeRequired: 'Nod för grundinformation krävs',
    baseNodeOnly: 'Endast en nod för grundinformation är tillåten',
    notInWorkFlowNode: 'Noden finns inte i arbetsflödet',
    noNextNode: 'Nästa nod finns inte',
    nodeUnavailable: 'Noden är inte tillgänglig',
    needConnect1: 'Nodens gren måste anslutas',
    cannotEndNode: 'Noden kan inte användas som slutnod',
    loopNodeBreakNodeRequired: 'En oändlig slinga måste ha en Break-nod',
  },
  nodes: {
    toolWorlflowNode: {
      label: 'Arbetsflödesverktyg',
      text: 'Arbetsflödesverktyg',
    },
    knowledgeWriteNode: {
      label: 'Skriv till kunskapsbas',
      text: 'Skriv den inmatade segmentlistan till aktuell kunskapsbas och slutför vektoriseringen',
    },
    dataSourceWebNode: {
      label: 'Webbplats',
      text: 'Ange rot-URL för att automatiskt hämta webbdata (en länk motsvarar ett dokument) och mata ut en lista med dokument och innehåll',
      field_label: 'Dokumentlista',
    },
    dataSourceLocalNode: {
      label: 'Lokal fil',
      text: 'Ladda upp lokala dokument och mata ut en dokumentlista (innehållet tolkas inte, används tillsammans med noden "Extrahering av dokumentinnehåll")',
      fileList: 'Fillista',
      fileFormat: {
        label: 'Filformat som stöds',
        requiredMessage: 'Välj filformat',
      },
      maxFileNumber: {
        label: 'Max antal filer per uppladdning',
      },
      maxFileCountNumber: {
        label: 'Max storlek per fil (MB)',
      },
    },
    classify: {
      aiCapability: 'AI-förmåga',
      businessLogic: 'Affärslogik',
      dataProcessing: 'Databearbetning',
    },
    startNode: {
      label: 'Start',
      question: 'Användarfråga',
      currentTime: 'Aktuell tid',
    },
    baseNode: {
      visibilitySetting: {
        label: 'Synlighetsinställning',
        showCondition‌: 'Villkor för att visa',
        hideCondition‌: 'Villkor för att dölja',
      },
      fileUpload: {
        label: 'Filuppladdning',
        tooltip: 'När funktionen är aktiverad visas en knapp för filuppladdning i chatten.',
      },
      FileUploadSetting: {
        title: 'Inställningar för filuppladdning',
        maxFiles: 'Max antal filer per uppladdning',
        fileLimit: 'Max storlek per fil (MB)',
        fileUploadType: {
          label: 'Filtyper som får laddas upp',
          documentText: 'Kräver noden "Extrahering av dokumentinnehåll" för att tolka dokumentinnehållet',
          imageText: 'Kräver noden "Bildförståelse" för att tolka bildinnehållet',
          videoText: 'Kräver noden "Videoförståelse" för att tolka videoinnehållet',
          audioText: 'Kräver noden "Tal till text" för att tolka ljudinnehållet',
          uploadMethod: 'Uppladdningsmetod',
        },
      },
    },
    KnowledgeBaseNode: {
      DocumentSetting: 'Inställningar för dokumentbearbetning',
    },
    aiChatNode: {
      label: 'AI-chatt',
      text: 'Chatta med en AI-modell',
      answer: 'AI-innehåll',
      vision: {
        label: 'bild',
      },
      returnContent: {
        label: 'Returnera innehåll',
        tooltip: `Om funktionen är avstängd visas inte nodens innehåll för användaren.
                  Aktivera brytaren om du vill att användaren ska se nodens utdata.`,
      },
      defaultPrompt: 'Känd information',
      think: 'Tankeprocess',
      historyMessage: 'Tidigare chattar',
    },
    searchKnowledgeNode: {
      label: 'Kunskapssökning',
      text: 'Sök textinnehåll i kunskapsbasen som är relevant för användarens fråga',
      paragraph_list: 'Lista över hämtade segment',
      is_hit_handling_method_list: 'Lista över segment som uppfyller kriterierna för direktsvar',
      result: 'Sökresultat',
      directly_return: 'Innehåll i segment som uppfyller kriterierna för direktsvar',
      searchParam: 'Sökparametrar',
      showKnowledge: {
        label: 'Resultaten visas i kunskapskällan',
        requiredMessage: 'Ange parametrar',
      },
      searchQuestion: {
        label: 'Fråga',
        placeholder: 'Välj en sökfråga',
        requiredMessage: 'Välj en sökfråga',
      },
    },
    searchDocumentNode: {
      label: 'Sökning via dokumentetiketter',
      text: 'Sök dokument som uppfyller villkoren utifrån dokumentetiketter inom det angivna sökområdet',
      selectKnowledge: 'Sökområde',
      searchSetting: 'Sökinställningar',
      custom: 'Manuell',
      customTooltip: 'Ange etikettfilter manuellt',
      auto: 'Automatisk',
      autoTooltip: 'Filtrera automatiskt etikettvillkor utifrån sökfrågan',
      documentList: 'Dokumentlista',
      knowledgeList: 'Lista över kunskapsbaser',
      result: 'Sökresultat',
      searchParam: 'Sökparametrar',
      select_variable: 'Välj variabel',
      valueMessage: 'Värde eller namn',

      searchQuestion: {
        label: 'Sökfråga',
        placeholder: 'Välj en sökfråga',
        requiredMessage: 'Välj en sökfråga',
      },
    },
    questionNode: {
      label: 'Frågeoptimering',
      text: 'Optimera och förbättra den aktuella frågan utifrån tidigare chattar så att den bättre matchar kunskapssegment',
      result: 'Optimerad fråga',
      systemDefault: `#Roll
Du är expert på frågeoptimering och kan utifrån kontexten korrekt tolka användarens avsikt och optimera de frågor som användaren ställer.

##Färdigheter
###Färdighet 1: Optimera frågor
2. Ta emot användarens fråga.
3. Analysera noggrant frågans innebörd utifrån kontexten.
4. Skriv ut den optimerade frågan.

##Begränsningar:
-Returnera endast den optimerade frågan utan ytterligare förklaringar.
-Se till att den optimerade frågan korrekt återger den ursprungliga avsikten och inte ändrar den.`,
    },
    conditionNode: {
      label: 'Villkorlig gren',
      text: 'Utlös olika noder beroende på villkor',
      branch_name: 'Grenens namn',
      conditions: {
        label: 'Villkor',
        info: 'Uppfyller följande',
        requiredMessage: 'Välj villkor',
      },
      valueMessage: 'Ange ett värde',
      addCondition: 'Lägg till villkor',
      addBranch: 'Lägg till gren',
    },
    replyNode: {
      label: 'Angivet svar',
      text: 'Ange svarsinnehåll, refererade variabler konverteras till text i utdata',
      replyContent: 'Svarsinnehåll',
    },
    rerankerNode: {
      label: 'Flervägshämtning',
      text: 'Använd en omrankningsmodell för att förfina sökresultat från flera kunskapskällor',
      result_list: 'Lista över omrankade resultat',
      result: 'Omrankningsresultat',
      rerankerContent: {
        label: 'Innehåll att omranka',
        requiredMessage: 'Välj innehåll att omranka',
      },
      higher: 'Högre',
      ScoreTooltip: 'Ju högre poäng, desto starkare relevans.',
      max_paragraph_char_number: 'Max antal tecken',
      reranker_model: {
        label: 'Omrankning',
        placeholder: 'Välj en omrankningsmodell',
      },
    },
    formNode: {
      label: 'Formulärinmatning',
      text: 'Samla in användarens inmatning under chatten och använd den i efterföljande steg',
      form_content_format1: 'Hej, fyll i formuläret nedan:',
      form_content_format2: 'Klicka på knappen [Skicka] när du har fyllt i det.',
      form_data: 'Allt formulärinnehåll',
      formContent: {
        label: 'Formulärets utdata',
        requiredMessage:
          'Ange nodens utdata, { form } är en platshållare för formuläret.',
        tooltip: 'Definiera nodens utdata. { form } är en platshållare för formuläret',
      },
      formAllContent: 'Allt formulärinnehåll',
      formSetting: 'Formulärkonfiguration',
    },
    documentExtractNode: {
      label: 'Extrahering av dokumentinnehåll',
      text: 'Tolka inmatade dokument och mata ut strukturerat dokumentinnehåll',
      content: 'Dokumentinnehåll',
    },
    documentSplitNode: {
      label: 'Dokumentuppdelning',
      text: 'Dela upp dokumentinnehållet enligt segmenteringsstrategin och mata ut en lista med segmenterade texter',
      paragraphList: 'Lista över uppdelade segment',
      splitStrategy: {
        label: 'Uppdelningsstrategi',
        placeholder: 'Välj en uppdelningsstrategi',
        requiredMessage: 'Välj en uppdelningsstrategi',
      },
      chunk_length: {
        label: 'Segmentlängd',
        tooltip1: 'Huvudmålet är att balansera sökprecision och träffsäkerhet',
        tooltip2:
          'Undvik för korta segment: Ett segment på under 50 tecken kan leda till semantisk fragmentering och missa frågans avsikt vid sökning på grund av bristande kontext.',
        tooltip3:
          'Undvik för långa segment: Ett block på över 500 tecken ökar mängden överflödig information, minskar sökprecisionen och kräver mer lagring och beräkningskraft.',
      },
      title1: 'Segmentets titel anges som segmentets kopplade fråga',
      title2: 'Dokumentets namn anges som segmentets kopplade fråga',
    },
    imageUnderstandNode: {
      label: 'Bildförståelse',
      text: 'Analysera bilder för att identifiera objekt och scener och ge svar',
      answer: 'AI-innehåll',
      model: {
        label: 'Bildmodell',
        requiredMessage: 'Välj en bildmodell',
      },
      image: {
        label: 'Välj bild',
        requiredMessage: 'Välj en bild',
      },
    },
    videoUnderstandNode: {
      label: 'Videoförståelse',
      text: 'Identifiera objekt, scener och annan information i videor för att besvara användarens frågor',
      answer: 'AI-svar',
      model: {
        label: 'Bildmodell',
        requiredMessage: 'Välj en bildmodell',
      },
      video: {
        label: 'Välj video',
        requiredMessage: 'Välj en video',
      },
    },
    variableAssignNode: {
      label: 'Variabeltilldelning',
      text: 'Uppdatera värdet på den globala variabeln',
      assign: 'Ange värde',
    },
    variableAggregationNode: {
      label: 'Variabelaggregering',
      text: 'Aggregera variablerna i varje grupp enligt aggregeringsstrategin',
      Strategy: 'Aggregeringsstrategi',
      placeholder: 'Returnera första icke-tomma värdet i varje grupp',
      placeholder1: 'Returnera en array med variablerna i varje grupp',
      placeholder2: 'Returnera ett dict med variablerna i varje grupp',
      group: {
        noneError: 'Namnet får inte vara tomt',
        dupError: 'Namnet får inte förekomma flera gånger',
      },
      addGroup: 'Lägg till grupp',
      editGroup: 'Redigera grupp',
    },
    mcpNode: {
      label: 'MCP-anrop',
      text: 'Anropa externa MCP-tjänster för att bearbeta data',
      getToolsSuccess: 'Verktygen har hämtats',
      getTool: 'Hämta verktyg',
      toolParam: 'Verktygsparametrar',
      mcpServerTip: 'Ange MCP-serverkonfiguration i JSON-format',
      mcpToolTip: 'Välj ett verktyg',
      configLabel: 'MCP-serverkonfiguration (endast SSE/Streamable HTTP stöds)',
      reference: 'Referera MCP',
    },
    imageGenerateNode: {
      label: 'Bildgenerering',
      text: 'Generera bilder utifrån angiven text',
      answer: 'AI-innehåll',
      model: {
        label: 'Modell för bildgenerering',
        requiredMessage: 'Välj en modell för bildgenerering',
      },
      prompt: {
        label: 'Positiv prompt',
        tooltip: 'Beskriv element och visuella egenskaper som du vill ha i den genererade bilden',
      },
      negative_prompt: {
        label: 'Negativ prompt',
        tooltip: 'Beskriv element som du vill utesluta från den genererade bilden',
        placeholder:
          'Beskriv innehåll som inte ska genereras, till exempel färger eller blodigt innehåll',
      },
    },
    textToVideoGenerate: {
      label: 'Text till video',
      text: 'Generera video utifrån angiven text',
      answer: 'AI-svar',
      model: {
        label: 'Modell för text till video',
        requiredMessage: 'Välj en modell för text till video',
      },
      prompt: {
        label: 'Prompt (positiv)',
        tooltip:
          'Positiv prompt som beskriver element och visuella egenskaper som förväntas i den genererade videon',
      },
      negative_prompt: {
        label: 'Prompt (negativ)',
        tooltip:
          'Negativ prompt som beskriver innehåll du inte vill se i videon och som kan begränsa videogenereringen',
        placeholder:
          'Beskriv videoinnehåll som inte ska genereras, till exempel färger eller blodigt innehåll',
      },
    },
    imageToVideoGenerate: {
      label: 'Bild till video',
      text: 'Generera video utifrån angivna bilder',
      answer: 'AI-svar',
      model: {
        label: 'Modell för bild till video',
        requiredMessage: 'Välj en modell för bild till video',
      },
      prompt: {
        label: 'Prompt (positiv)',
        tooltip:
          'Positiv prompt som beskriver element och visuella egenskaper som förväntas i den genererade videon',
      },
      negative_prompt: {
        label: 'Prompt (negativ)',
        tooltip:
          'Negativ prompt som beskriver innehåll du inte vill se i videon och som kan begränsa videogenereringen',
        placeholder:
          'Beskriv videoinnehåll som inte ska genereras, till exempel färger eller blodigt innehåll',
      },
      first_frame: {
        label: 'Första bildruta',
        requiredMessage: 'Välj den första bildrutan',
      },
      last_frame: {
        label: 'Sista bildruta',
        requiredMessage: 'Välj den sista bildrutan',
      },
    },
    speechToTextNode: {
      label: 'Tal till text',
      text: 'Omvandla ljud till text med en modell för taligenkänning',
      stt_model: {
        label: 'Modell för taligenkänning',
      },
      audio: {
        label: 'Välj ljudfil',
        placeholder: 'Välj en ljudfil',
      },
    },
    textToSpeechNode: {
      label: 'Text till tal',
      text: 'Omvandla text till ljud med en modell för talsyntes',
      tts_model: {
        label: 'Modell för talsyntes',
      },
      content: {
        label: 'Välj textinnehåll',
      },
    },
    toolNode: {
      label: 'Anpassat verktyg',
      text: 'Kör anpassade skript för databearbetning',
    },
    intentNode: {
      label: 'Avsiktsnod',
      text: 'Matcha användarens frågor mot användardefinierade avsiktskategorier',
      error2: 'Upprepad avsikt',
      placeholder: 'Välj en kategori',
      classify: {
        label: 'Avsiktskategori',
      },
      input: {
        label: 'Indata',
      },
    },
    applicationNode: {
      label: 'Agentnod',
    },
    loopNode: {
      label: 'Slinga',
      text: 'Upprepa en serie uppgifter genom att ange antal varv och logik',
      loopType: {
        label: 'Slingtyp',
        requiredMessage: 'Välj en slingtyp',
        arrayLoop: 'Array-slinga',
        numberLoop: 'Slinga ett angivet antal gånger',
        infiniteLoop: 'Oändlig slinga',
      },
      loopNumber: {
        label: 'Antal varv',
        requiredMessage: 'Ange antal varv',
      },
      loopArray: {
        label: 'Array att iterera',
        requiredMessage: 'Array att iterera krävs',
        placeholder: 'Välj en array att iterera',
      },
      loopSetting: 'Slinginställningar',
      loopDetail: 'Slingdetaljer',
    },
    loopStartNode: {
      label: 'Slingstart',
      loopIndex: 'Index',
      loopItem: 'Slingelement',
    },
    loopBodyNode: {
      label: 'Slingkropp',
      text: 'Slingkropp',
    },
    loopContinueNode: {
      label: 'Continue',
      text: 'Avslutar det aktuella varvet och fortsätter med nästa.',
      isContinue: 'Continue',
    },
    loopBreakNode: {
      label: 'Break',
      text: 'Avsluta det aktuella varvet och lämna slingkroppen',
      isBreak: 'Break',
    },
    variableSplittingNode: {
      label: 'Variabeluppdelning',
      text: 'Tolka och dela upp den inmatade JSON-variabeln med hjälp av JSON Path-uttryck',
      result: 'Resultat',
      splitVariables: 'Uppdelade variabler',
      inputVariables: 'Indatavariabel',
      addVariables: 'Lägg till variabler',
      editVariables: 'Redigera variabler',
      variableListPlaceholder: 'Lägg till variabler för uppdelning',
      expression: {
        label: 'Uttryck',
        placeholder: 'Ange uttryck',
        tooltip:
          'Använd JSON Path-uttryck för att dela upp variabler, t.ex.: $.store.book <a href="https://pypi.org/project/jsonpath-ng/1.8.0/" target="_blank" class="expression_tip">Klicka för detaljer ➜ pypi.org</a>',
      },
    },
    parameterExtractionNode: {
      label: 'Parameterextrahering',
      text: 'Använd AI-modeller för att extrahera strukturerade parametrar',
      extractParameters: {
        label: 'Extrahera parametrar',
        variableListPlaceholder: 'Lägg till parametrar att extrahera',
        parameterType: 'Parametertyp',
      },
    },
  },
  compare: {
    is_null: 'Är tom',
    is_not_null: 'Är inte tom',
    contain: 'Innehåller',
    not_contain: 'Innehåller inte',
    eq: 'Lika med',
    not_eq: 'Inte lika med',
    ge: 'Större än eller lika med',
    gt: 'Större än',
    le: 'Mindre än eller lika med',
    lt: 'Mindre än',
    len_eq: 'Längd lika med',
    len_ge: 'Längd större än eller lika med',
    len_gt: 'Längd större än',
    len_le: 'Längd mindre än eller lika med',
    len_lt: 'Längd mindre än',
    is_true: 'Är sant',
    is_not_true: 'Är inte sant',
    regex: 'Matchning med reguljärt uttryck',
    wildcard: 'Matchning med jokertecken',
  },
  SystemPromptPlaceholder: 'Systemprompt, kan referera till systemvariabler som',
  UserPromptPlaceholder: 'Användarprompt, kan referera till systemvariabler som',
  initiator: 'Initiativtagare',
  abnormalInformation: 'Felinformation',
}
