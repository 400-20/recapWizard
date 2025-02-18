interface Window {
    webkitSpeechRecognition: typeof SpeechRecognition
  }
  
  interface SpeechRecognition {
    onresult: (event: SpeechRecognitionEvent) => void
    onerror: (event: SpeechRecognitionError) => void
    onstart: () => void
    onend: () => void
    onnomatch: () => void
    onsoundstart: () => void
    onsoundend: () => void
    onspeechstart: () => void
    onspeechend: () => void
    continuous: boolean
    lang: string
    maxAlternatives: number
    start(): void
    stop(): void
    abort(): void
  }
  
  interface SpeechRecognitionEvent {
    results: SpeechRecognitionResultList
    resultIndex: number
    emma: string
  }
  
  interface SpeechRecognitionResultList {
    length: number
    item(index: number): SpeechRecognitionResult | null
  }
  
  interface SpeechRecognitionResult {
    isFinal: boolean
    0: SpeechRecognitionAlternative
  }
  
  interface SpeechRecognitionAlternative {
    transcript: string
    confidence: number
  }
  
  interface SpeechRecognitionError {
    error: string
    message: string
  }
  
  