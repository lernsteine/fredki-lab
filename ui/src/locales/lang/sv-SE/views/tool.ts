export default {
  title: 'Verktyg',
  all: 'Alla',
  createTool: 'Skapa verktyg',
  editTool: 'Redigera verktyg',
  copyTool: 'Kopiera verktyg',
  importTool: 'Importera verktyg',
  settingTool: 'Konfigurera verktyg',
  updatedVersion: 'Uppdaterad version',
  generateCodeDialog: {
    generatePrompt: 'Generera Python-kod',
    placeholder: 'Ange ämnet',
    title: 'Python-koden visas här',
  },
  toolWorkflow: {
    title: 'Arbetsflöde',
    copyToolWorkflow: 'Kopiera arbetsflöde',
    creatToolWorkflow: 'Skapa arbetsflöde',
    toActiveTip: 'Kan inte aktiveras. Publicera arbetsflödet först.',
    debugResult: 'Felsökningsresultat',
  },
  dataSource: {
    title: 'Datakälla',
    createDataSource: 'Skapa datakälla',
    editDataSource: 'Redigera datakälla',
    copyDataSource: 'Kopiera datakälla',
    selectDataSource: 'Välj datakälla',
    requiredMessage: 'Välj datakälla',
  },
  toolStore: {
    title: 'Verktygsbutik',
    createFromToolStore: 'Skapa från verktygsbutik',
    internal: 'Inbyggt i systemet',
    recommend: 'Rekommenderat',
    webSearch: 'Webbsökning',
    databaseQuery: 'Databasfråga',
    image: 'Bild',
    developer: 'Utvecklare',
    communication: 'Kommunikation',
    searchResult: '{count} sökresultat för',
    confirmTip: 'Vill du verkligen uppdatera verktyget: ',
    updateStoreToolMessage: 'Uppdatering av verktyg kan påverka resurser som används, var försiktig.',
  },
  mcp: {
    title: 'MCP-tjänst',
    label: 'MCP-serverkonfiguration',
    placeholder: 'Ange MCP-serverkonfiguration',
    tip: 'Endast anropsmetoderna SSE och Streamable HTTP stöds',
    requiredMessage: 'Ange MCP-serverkonfiguration',
    createMcpTool: 'Skapa MCP',
    editMcpTool: 'Redigera MCP',
    copyMcpTool: 'Kopiera MCP',
    mcpConfig: 'MCP-tjänstkonfiguration',
  },
  skill: {
    title: 'Förmågor',
    copySkillTool: 'Kopiera förmågor',
    createSkillTool: 'Skapa förmågor',
    editSkillTool: 'Redigera förmågor',
    initParamPlaceholder: 'Parametrar som måste konfigureras när förmågan aktiveras',
    skillFile: 'Förmågefil',
    reUpload: 'Ladda upp igen',
  },
  tip: {
    saveMessage: 'Osparade ändringar går förlorade. Vill du verkligen avsluta?',
  },
  delete: {
    confirmTitle: 'Bekräfta radering av verktyg:',
    confirmTitle2: 'verktyg?',
    confirmMessage:
      'Om verktyget raderas uppstår fel i agenter som refererar till det när de används. Var försiktig.',
    resourceCountMessage:
      'Verktyget är kopplat till {count} resurser som blir oanvändbara efter raderingen. Var försiktig.',
  },
  disabled: {
    confirmTitle: 'Bekräfta inaktivering av verktyg:',
    confirmMessage:
      'Om verktyget inaktiveras uppstår fel i resurser som refererar till det när de körs. Var försiktig.',
  },

  form: {
    toolName: {
      label: 'Verktygsnamn',
      placeholder: 'Ange verktygets namn',
      requiredMessage: 'Ange verktygets namn',
    },
    mcpName: {
      placeholder: 'Ange MCP-namnet',
      requiredMessage: 'Ange MCP-namnet',
    },
    workflowName: {
      label: 'Arbetsflödets namn',
      placeholder: 'Ange arbetsflödets namn',
      requiredMessage: 'Ange arbetsflödets namn',
    },
    paramName: {
      label: 'Parameternamn',
      placeholder: 'Ange parameterns namn',
      requiredMessage: 'Ange parameterns namn',
    },
    dataType: {
      label: 'Datatyp',
    },
    source: {
      label: 'Källa',
      reference: 'Referensparameter',
    },
    param: {
      paramInfo1: 'Visas när verktyget används',
      paramInfo2: 'Visas inte när verktyget används',
      code: 'Innehåll (Python)',
      selectPlaceholder: 'Välj parameter',
      inputPlaceholder: 'Ange parametervärden',
    },
    debug: {
      run: 'Kör',
      output: 'Utdata',
      runResult: 'Körningsresultat',
      runSuccess: 'Lyckades',
      runFailed: 'Körningen misslyckades',
    },
  },
}
