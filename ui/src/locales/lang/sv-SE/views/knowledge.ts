export default {
  title: 'Kunskap',
  relatedApplications: 'Kopplad agent',
  document_count: 'dokument',
  relatedApp_count: 'kopplade agenter',
  setting: {
    vectorization: 'Vektorisering',
    sync: 'Synkronisera',
    tokenize: 'Tokenisera',
  },
  tip: {
    professionalMessage:
      'Community-utgåvan stöder upp till 50 kunskapsbaser. För fler, uppgradera till Professional-utgåvan.',
    syncSuccess: 'Synkroniseringsuppgiften har skickats',
    updateModeMessage:
      'När kunskapsbasens vektormodell har ändrats måste kunskapsbasen vektoriseras. Vill du fortsätta spara?',
  },
  delete: {
    confirmTitle: 'Bekräfta radering av kunskapsbas:',
    confirmTitle2: 'kunskapsbaser?',
    confirmMessage1: 'Kunskapsbasen är kopplad till',
    confirmMessage2: 'agenter. Raderingen kan inte ångras, var försiktig.',
    resourceCountMessage:
      'Kunskapsbasen är kopplad till {count} resurser som blir oanvändbara efter raderingen. Var försiktig.',
  },
  knowledgeType: {
    label: 'Typ',
    generalKnowledge: 'Allmän kunskapsbas',
    webKnowledge: 'Webbkunskapsbas',
    larkKnowledge: 'Lark-kunskapsbas',
    workflowKnowledge: 'Arbetsflödeskunskapsbas',
    yuqueKnowledge: 'Yuque-kunskapsbas',
    generalInfo: 'Ladda upp lokala dokument',
    webInfo: 'Synkronisera textdata från en webbplats',
    larkInfo: 'Bygg kunskap från Lark-dokument',
    yuqueInfo: 'Bygg kunskap från Yuque-dokument',
    createGeneralKnowledge: 'Skapa allmän kunskapsbas',
    createWebKnowledge: 'Skapa webbkunskapsbas',
    createLarkKnowledge: 'Skapa Lark-kunskapsbas',
    createYuqueKnowledge: 'Skapa Yuque-kunskapsbas',
    createWorkflowKnowledge: 'Skapa arbetsflödeskunskapsbas',
    workflowInfo: 'Bygg en kunskapsbas med anpassade arbetsflöden',
  },
  form: {
    knowledgeName: {
      label: 'Namn',
      placeholder: 'Ange kunskapsbasens namn',
      requiredMessage: 'Ange kunskapsbasens namn',
    },
    knowledgeDescription: {
      label: 'Beskrivning',
      placeholder:
        'Beskriv kunskapsbasens innehåll. En utförlig beskrivning hjälper AI:n att förstå innehållet bättre och förbättrar träffsäkerheten vid sökning.',
      requiredMessage: 'Ange kunskapsbasens beskrivning',
    },
    EmbeddingModel: {
      label: 'Embedding-modell',
      placeholder: 'Välj en embedding-modell',
      requiredMessage: 'Välj embedding-modell',
    },

    source_url: {
      label: 'Webbplatsens rot-URL',
      placeholder: 'Ange webbplatsens rot-URL',
      requiredMessage: 'Ange webbplatsens rot-URL',
    },
    selector: {
      label: 'Selektor',
      placeholder: 'Standard är body, kan anges som .klassnamn/#idnamn/taggnamn',
    },
    file_count_limit: {
      label: 'Max antal filer per uppladdning',
    },
    file_size_limit: {
      label: 'Max storlek per dokument (MB)',
      placeholder: 'Anpassa efter serverkonfigurationen, annars kan tjänsten stängas av',
    },
    appTemplate: {
      blank: {
        title: 'Tom',
      },
      basic: {
        title: 'Grundmall',
        description:
          'Grundläggande arbetsflödesmallar för lokala filer, Lark-dokument och webbplatser som datakällor',
      },
    },
  },

  ResultSuccess: {
    title: 'Kunskapsbasen har skapats',
    paragraph: 'Segment',
    paragraph_count: 'Segment',
    documentList: 'Dokumentlista',
    loading: 'Importerar',
    buttons: {
      toKnowledge: 'Till kunskapsbaserna',
      toDocument: 'Gå till dokument',
    },
  },
  syncWeb: {
    title: 'Synkronisera kunskapsbas',
    syncMethod: 'Synkroniseringsmetod',
    replace: 'Ersättande synkronisering',
    replaceText: 'Hämta webbplatsens dokument på nytt och ersätt dokumenten i den lokala kunskapsbasen',
    complete: 'Fullständig synkronisering',
    completeText: 'Radera alla dokument i den lokala kunskapsbasen och hämta webbplatsens dokument på nytt',
    tip: 'Obs! All synkronisering raderar befintliga data och hämtar nya. Var försiktig.',
  },
  transform: {
    button: 'Konvertera',
    title: 'Konvertera till arbetsflödeskunskapsbas',
    message1:
      'Du kan nu konvertera din befintliga kunskapsbas till en arbetsflödeskunskapsbas – en öppnare och mer flexibel typ där du själv orkestrerar hela processen från olika datakällor till skrivning i kunskapsbasen med dra-och-släpp-noder, anpassat efter organisationens behov av kunskapshantering. Du kan använda de datakällor och verktyg som finns tillgängliga. ',
    message2: 'Den nya bearbetningsmetoden tillämpas på alla dokument som importeras härefter.',
    tip: 'Obs! Konverteringen kan inte ångras.',
    confirm:
      'Vill du verkligen konvertera till en arbetsflödeskunskapsbas? Åtgärden kan inte ångras. Var försiktig.',
  },
  customSegmentation: {
    title: 'Anpassade termer',
    tip: 'Förhindra att facktermer delas upp och förbättra precision och träffsäkerhet i fulltextsökningen',
    create: 'Skapa term',
    quickCreate: 'Snabbskapa term',
    word: 'Term',
    wordplaceholder:
      'Ange facktermer/unika ord som ska bevaras, en per rad',
    wordRequiredMessage: 'Ange en term',
    wordIndexing: 'Termindexering',
  },
}
