export default {
  title: 'Modell',
  provider: 'Leverantör',
  providerPlaceholder: 'Välj leverantör',
  addModel: 'Lägg till modell',

  delete: {
    confirmTitle: 'Radera modell:',
    confirmMessage:
      'Om modellen raderas påverkas de resurser som använder den. Var försiktig.',
    resourceCountMessage: 'Modellen är kopplad till {count} resurser som blir oanvändbara efter raderingen. Var försiktig.',
  },
  tip: {
    createSuccessMessage: 'Modellen har skapats',
    createErrorMessage: 'Grundinformationen innehåller fel',
    errorMessage: 'Variabeln finns redan: ',
    emptyMessage1: 'Välj först modelltyp och basmodell i grundinformationen',
    emptyMessage2: 'Den valda modellen stöder inte parameterinställningar',
    updateSuccessMessage: 'Modellen har uppdaterats',
    saveSuccessMessage: 'Modellparametrarna har sparats',
    downloadError: 'Nedladdningen misslyckades',
    noModel: 'Modellen finns inte i Ollama',
  },
  modelType: {
    allModel: 'Alla modeller',
    publicModel: 'Offentliga modeller',
    privateModel: 'Privata modeller',
    LLM: 'LLM',
    EMBEDDING: 'Embedding-modell',
    RERANKER: 'Omrankning',
    STT: 'Tal till text',
    TTS: 'Text till tal',
    IMAGE: 'Bildmodell',
    TTI: 'Bildgenerering',
    TTV: 'Text till video',
    ITV: 'Bild till video',
  },
  modelForm: {
    title: {
      baseInfo: 'Grundinformation',
      advancedInfo: 'Avancerade inställningar',
      modelParams: 'Modellparametrar',
      paramSetting: 'Inställningar för modellparametrar',
      apiParamPassing: 'Gränssnittsparametrar',
    },
    modeName: {
      label: 'Modellnamn',
      placeholder: 'Ange ett namn för basmodellen',
      tooltip: 'Anpassat modellnamn i MaxKB',
      requiredMessage: 'Modellnamnet får inte vara tomt',
    },
    permissionType: {
      label: 'Behörighet',
      privateDesc: 'Endast tillgänglig för aktuell användare',
      publicDesc: 'Tillgänglig för alla användare',
      requiredMessage: 'Behörighet får inte vara tom',
    },
    model_type: {
      label: 'Modelltyp',
      placeholder: 'Välj en modelltyp',
      tooltip1: 'LLM: En inferensmodell för AI-chattar i agenten.',
      tooltip2: 'Embedding-modell: En modell för att vektorisera dokumentinnehåll i kunskapsbasen.',
      tooltip3: 'Tal till text: En modell för taligenkänning i agenten.',
      tooltip4: 'Text till tal: En modell för talsyntes i agenten.',
      tooltip5:
        'Omrankning: En modell som sorterar om kandidatsegment vid flervägshämtning i avancerat orkestrerade agenter.',
      tooltip6:
        'Bildmodell: En visuell modell för bildförståelse i avancerat orkestrerade agenter.',
      tooltip7:
        'Bildgenerering: En visuell modell för att generera bilder i avancerat orkestrerade agenter.',
      tooltip8:
        'Text till video: En visuell modell för text till video i agenten.',
      tooltip9:
        'Bild till video: En visuell modell för bild till video i agenten.',
      requiredMessage: 'Modelltypen får inte vara tom',
    },
    base_model: {
      label: 'Basmodell',
      tooltip: 'För modeller som inte finns i listan, ange modellnamnet och tryck på Enter',
      placeholder: 'Ange basmodellens namn och tryck på Enter för att lägga till',
      requiredMessage: 'Basmodellen får inte vara tom',
    },
  },
  download: {
    downloading: 'Laddar ned...',
    cancelDownload: 'Avbryt nedladdning',
  },
}
