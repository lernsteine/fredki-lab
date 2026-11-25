export default {
  input_type_list: {
    TextInput: 'Inmatning',
    PasswordInput: 'Lösenord',
    Slider: 'Skjutreglage',
    SwitchInput: 'Brytare',
    SingleSelect: 'Enkelval',
    MultiSelect: 'Flerval',
    DatePicker: 'Datumväljare',
    JsonInput: 'JSON',
    RadioCard: 'Alternativkort',
    RadioRow: 'Alternativrad',
    UploadInput: 'Filuppladdning',
    TextareaInput: 'Flerradsinmatning',
    MultiRow: 'Flera rader',
    Model: 'Modell',
    Knowledge: 'Kunskapsbas',
  },
  default: {
    label: 'Standard',
    placeholder: 'Ange ett standardvärde',
    requiredMessage: ' är en obligatorisk egenskap',
    show: 'Visa standardvärde',
  },
  tip: {
    requiredMessage: 'får inte vara tomt',
    jsonMessage: 'Felaktigt JSON-format',
  },
  paramForm: {
    field: {
      label: 'Parameter',
      placeholder: 'Ange en parameter',
      requiredMessage: 'Parameter är en obligatorisk egenskap',
      requiredMessage2: 'Endast bokstäver, siffror och understreck är tillåtna',
    },
    name: {
      label: 'Namn',
      placeholder: 'Ange ett namn',
      requiredMessage: 'Namn är en obligatorisk egenskap',
    },
    tooltip: {
      label: 'Verktygstips',
      placeholder: 'Ange ett verktygstips',
    },
    required: {
      label: 'Obligatorisk',
      requiredMessage: 'Obligatorisk är en obligatorisk egenskap',
    },
    input_type: {
      label: 'Typ',
      placeholder: 'Välj en typ',
      requiredMessage: 'Typ är en obligatorisk egenskap',
    },
    desc: {
      label: 'beskrivning',
      placeholder: 'Ange en beskrivning',
    },
  },
  TreeSelect: {
    label: 'Trädval',
    select: 'Alternativ',
    selectRequired: 'Alternativ krävs',
    allowMultipleSelections: 'Tillåt flera val',
    addDialog: {
      addFirstOption: 'Lägg till rotalternativ',
      addSubOptions: 'Lägg till underalternativ',
      require: 'Ange minst en fullständig post',
      nodeNotFound: 'Överordnad nod hittades inte',
      tagRequire: 'Etikett och värde får inte vara tomma',
    },
  },
  DatePicker: {
    placeholder: 'Välj datum',
    year: 'År',
    month: 'Månad',
    date: 'Datum',
    datetime: 'Datum och tid',
    dataType: {
      label: 'Datumtyp',
      placeholder: 'Välj en datumtyp',
    },
    format: {
      label: 'Format',
      placeholder: 'Välj ett format',
    },
  },
  Select: {
    label: 'Alternativvärde',
    placeholder: 'Ange ett alternativvärde',
  },
  tag: {
    label: 'Etikett',
    placeholder: 'Ange en alternativetikett',
  },
  Slider: {
    showInput: {
      label: 'Visa inmatningsfält',
    },
    valueRange: {
      label: 'Värdeintervall',
      minRequired: 'Minimivärde krävs',
      maxRequired: 'Maximivärde krävs',
    },
    step: {
      label: 'Stegvärde',
      requiredMessage1: 'Stegvärde krävs',
      requiredMessage2: 'Stegvärdet får inte vara 0',
    },
  },
  TextInput: {
    length: {
      label: 'Textlängd',
      minRequired: 'Minsta längd krävs',
      maxRequired: 'Största längd krävs',
      requiredMessage1: 'Längden måste vara mellan',
      requiredMessage2: 'och',
      requiredMessage3: 'tecken',
      requiredMessage4: 'Textlängd är en obligatorisk parameter',
    },
  },
  UploadInput: {
    limit: {
      label: 'Max antal filer per uppladdning',
      required: 'Max antal filer krävs',
    },
    max_file_size: {
      label: 'Max filstorlek (MB)',
      required: 'Max filstorlek krävs',
    },
    accept: {
      label: 'Filtyp',
      required: 'Filtyp krävs',
    },
    errorTip: {
      sizeError: 'Filstorleken överskrider gränsen',
      networkError: 'Nätverksfel',
    },
    reUpload: 'Försök igen',
    uploadStatus: '{success} / {total} filer klara',
    failedStatus: '{count} filer misslyckades',
    uploading: 'Laddar upp',
    allSuccess: 'Alla lyckades',
  },
  AssignmentMethod: {
    label: 'Tilldelningsmetod',
    ref_variables: {
      label: 'Referensvariabler',
      popover: 'Variabelvärden måste följa',
      json_format: 'JSON-format',
      popover_label: 'Etikett',
      popover_value: 'Värde',
      popover_default: 'Är standard',
    },
  },
  ModelConstructor: {
    optionalModel: 'Valbar modell',
    defaultModel: 'Standardmodell',
    modelPlaceholder: 'Ange en modell',
  },
  KnowledgeConstructor: {
    optionalModel: 'Valbar modell',
    defaultModel: 'Standardmodell',
    modelPlaceholder: 'Ange en modell',
  },
}
