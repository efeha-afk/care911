import { useState, useEffect, useRef, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// I18N — 4 languages
// ─────────────────────────────────────────────────────────────────────────────
const LANGS = {
  en: {
    code:"en-US", flag:"🇺🇸", name:"English",
    appName:"Care911",
    tagline:"Tap to get help now",
    subTagline:"AI triage → find care → navigate",
    getHelp:"Get Help Now",
    aiTriage:"AI Triage",
    findCare:"Find Care",
    intake:"Intake",
    contacts:"Contacts",
    insurance:"Insurance",
    settings:"Settings",
    home:"Home",
    nearby:"Area Overview",
    facilities:"Facilities",
    shortestWait:"Shortest Wait",
    closest:"Closest",
    notifyAll:"Notify All Contacts",
    addContact:"Add Contact",
    saveInsurance:"Save Insurance Info",
    saveIntake:"Save & Download Form",
    startNav:"Start Navigation",
    navActive:"Navigation Active",
    openMaps:"Open in Google Maps",
    callAhead:"Call Ahead",
    navigate:"Navigate",
    prefillIntake:"Pre-fill Intake",
    notifyFamily:"Notify Family",
    openNow:"Open Now",
    backToResults:"Back to results",
    triageTitle:"AI Triage",
    triageSub:"Powered by Claude · Not a substitute for 911",
    triageGreeting:"👋 Hi! I'm your Care911 triage assistant. Describe your symptoms or injury and I'll help assess your urgency level and recommend the best care option.",
    triagePlaceholder:"Describe your symptoms…",
    findBestFacility:"🏥 Find Best Facility Now",
    scanCard:"📷 Scan Card",
    enterManually:"✍️ Enter Manually",
    scanCardTitle:"Scan Insurance Card",
    scanCardSub:"Take a photo or upload front of card",
    scanCardAI:"AI will auto-extract your details",
    scanSuccess:"✅ Card Scanned Successfully",
    scanDifferent:"🔄 Scan Different Card",
    scanning:"🔍 Scanning card with AI…",
    sendSMS:"Send SMS",
    smsSent:"Message sent!",
    callEnded:"Call Ended",
    connected:"✅ Connected",
    ringing:"📞 Ringing…",
    endCall:"End Call",
    notified:"✓ Notified",
    login:"Sign In",
    logout:"Sign Out",
    loginTitle:"Welcome to Care911",
    loginSub:"Sign in to save your profile & get faster care",
    email:"Email",
    password:"Password",
    name:"Name",
    createAccount:"Create Account",
    alreadyHave:"Already have an account?",
    dontHave:"Don't have an account?",
    profile:"My Profile",
    darkMode:"Dark Mode",
    lightMode:"Light Mode",
    language:"Language",
    notifications:"Notifications",
    pushEnabled:"Push Notifications Enabled",
    pushDisabled:"Enable Push Notifications",
    gpsTitle:"Location Access",
    gpsGrant:"Grant Location Access",
    gpsGranted:"📍 Location Active",
    voiceCmd:"Voice Command",
    voiceListening:"🎙️ Listening…",
    voiceActive:"🎙️ Voice Active",
    voiceTap:"Tap mic to speak",
    voiceLang:"Voice Language",
    severity:"Severity",
    minor:"Minor",
    moderate:"Moderate",
    severe:"Severe",
    wait:"Wait",
    distance:"Distance",
    rating:"Rating",
    doctors:"Doctors",
    services:"Services",
    demographics:"👤 Info",
    injury:"🩹 Injury",
    medical:"💊 Medical",
    firstName:"First Name",
    lastName:"Last Name",
    dob:"Date of Birth",
    gender:"Gender",
    phone:"Phone",
    bloodType:"Blood Type",
    emailField:"Email",
    allergies:"Known Allergies",
    medications:"Current Medications",
    injuryType:"Injury Type",
    notes:"Additional Notes",
    notesPlaceholder:"Describe what happened…",
    provider:"Insurance Provider",
    memberId:"Member ID",
    groupNumber:"Group #",
    holderName:"Policy Holder Name",
    planName:"Plan Name",
    relationship:"Relationship",
    relation:"Relation",
    addContactBtn:"+ Add Contact",
    downloadForm:"📄 Download Pre-filled Form",
    addInsurance:"🛡️ Add Insurance Info",
    quickPrompts:["Chest pain since morning","I cut my hand badly","Twisted my ankle","High fever 103°F","Child fell, hit head"],
  },
  es: {
    code:"es-ES", flag:"🇪🇸", name:"Español",
    appName:"Care911",
    tagline:"Toca para obtener ayuda ahora",
    subTagline:"IA de triage → encontrar atención → navegar",
    getHelp:"Obtener Ayuda Ahora",
    aiTriage:"IA Triage",
    findCare:"Buscar",
    intake:"Registro",
    contacts:"Contactos",
    insurance:"Seguro",
    settings:"Ajustes",
    home:"Inicio",
    nearby:"Área Local",
    facilities:"Centros",
    shortestWait:"Menor Espera",
    closest:"Más Cercano",
    notifyAll:"Notificar a Todos",
    addContact:"Añadir Contacto",
    saveInsurance:"Guardar Seguro",
    saveIntake:"Guardar y Descargar",
    startNav:"Iniciar Navegación",
    navActive:"Navegación Activa",
    openMaps:"Abrir en Google Maps",
    callAhead:"Llamar al Centro",
    navigate:"Navegar",
    prefillIntake:"Rellenar Formulario",
    notifyFamily:"Avisar Familia",
    openNow:"Abierto Ahora",
    backToResults:"Volver a resultados",
    triageTitle:"Triage IA",
    triageSub:"Impulsado por Claude · No reemplaza al 911",
    triageGreeting:"👋 ¡Hola! Soy tu asistente de triage de Care911. Describe tus síntomas y te ayudaré a evaluar la urgencia y recomendar la mejor atención.",
    triagePlaceholder:"Describe tus síntomas…",
    findBestFacility:"🏥 Encontrar el Mejor Centro",
    scanCard:"📷 Escanear Tarjeta",
    enterManually:"✍️ Ingresar Manualmente",
    scanCardTitle:"Escanear Tarjeta de Seguro",
    scanCardSub:"Toma una foto o sube el frente de la tarjeta",
    scanCardAI:"La IA extraerá tus datos automáticamente",
    scanSuccess:"✅ Tarjeta Escaneada Correctamente",
    scanDifferent:"🔄 Escanear Otra Tarjeta",
    scanning:"🔍 Escaneando con IA…",
    sendSMS:"Enviar SMS",
    smsSent:"¡Mensaje enviado!",
    callEnded:"Llamada Terminada",
    connected:"✅ Conectado",
    ringing:"📞 Llamando…",
    endCall:"Terminar Llamada",
    notified:"✓ Notificado",
    login:"Iniciar Sesión",
    logout:"Cerrar Sesión",
    loginTitle:"Bienvenido a Care911",
    loginSub:"Inicia sesión para guardar tu perfil",
    email:"Correo Electrónico",
    password:"Contraseña",
    name:"Nombre",
    createAccount:"Crear Cuenta",
    alreadyHave:"¿Ya tienes cuenta?",
    dontHave:"¿No tienes cuenta?",
    profile:"Mi Perfil",
    darkMode:"Modo Oscuro",
    lightMode:"Modo Claro",
    language:"Idioma",
    notifications:"Notificaciones",
    pushEnabled:"Notificaciones Activadas",
    pushDisabled:"Activar Notificaciones",
    gpsTitle:"Acceso a Ubicación",
    gpsGrant:"Conceder Acceso GPS",
    gpsGranted:"📍 Ubicación Activa",
    voiceCmd:"Comando de Voz",
    voiceListening:"🎙️ Escuchando…",
    voiceActive:"🎙️ Voz Activa",
    voiceTap:"Toca el micrófono para hablar",
    voiceLang:"Idioma de Voz",
    severity:"Gravedad",
    minor:"Leve",
    moderate:"Moderado",
    severe:"Grave",
    wait:"Espera",
    distance:"Distancia",
    rating:"Valoración",
    doctors:"Médicos",
    services:"Servicios",
    demographics:"👤 Info",
    injury:"🩹 Lesión",
    medical:"💊 Médico",
    firstName:"Nombre",
    lastName:"Apellido",
    dob:"Fecha de Nacimiento",
    gender:"Género",
    phone:"Teléfono",
    bloodType:"Tipo de Sangre",
    emailField:"Correo",
    allergies:"Alergias Conocidas",
    medications:"Medicamentos Actuales",
    injuryType:"Tipo de Lesión",
    notes:"Notas Adicionales",
    notesPlaceholder:"Describe lo que ocurrió…",
    provider:"Proveedor de Seguro",
    memberId:"ID de Miembro",
    groupNumber:"Número de Grupo",
    holderName:"Nombre del Titular",
    planName:"Nombre del Plan",
    relationship:"Relación",
    relation:"Parentesco",
    addContactBtn:"+ Añadir Contacto",
    downloadForm:"📄 Descargar Formulario",
    addInsurance:"🛡️ Añadir Seguro",
    quickPrompts:["Dolor de pecho esta mañana","Me corté la mano","Me torcí el tobillo","Fiebre alta 39°C","Niño se cayó y golpeó la cabeza"],
  },
  zh: {
    code:"zh-CN", flag:"🇨🇳", name:"中文",
    appName:"急救911",
    tagline:"点击立即获取帮助",
    subTagline:"AI分诊 → 查找医疗 → 导航",
    getHelp:"立即获取帮助",
    aiTriage:"AI分诊",
    findCare:"查找",
    intake:"登记",
    contacts:"联系人",
    insurance:"保险",
    settings:"设置",
    home:"主页",
    nearby:"周边概览",
    facilities:"医疗机构",
    shortestWait:"最短等待",
    closest:"最近",
    notifyAll:"通知所有联系人",
    addContact:"添加联系人",
    saveInsurance:"保存保险信息",
    saveIntake:"保存并下载表格",
    startNav:"开始导航",
    navActive:"导航进行中",
    openMaps:"在谷歌地图中打开",
    callAhead:"提前致电",
    navigate:"导航",
    prefillIntake:"预填表格",
    notifyFamily:"通知家属",
    openNow:"现在开放",
    backToResults:"返回结果",
    triageTitle:"AI分诊助手",
    triageSub:"由Claude驱动 · 不替代急救电话",
    triageGreeting:"👋 您好！我是Care911的分诊助手。请描述您的症状，我将帮助评估紧急程度并推荐最佳医疗方案。",
    triagePlaceholder:"描述您的症状…",
    findBestFacility:"🏥 立即查找最佳医疗机构",
    scanCard:"📷 扫描卡片",
    enterManually:"✍️ 手动输入",
    scanCardTitle:"扫描保险卡",
    scanCardSub:"拍摄或上传保险卡正面",
    scanCardAI:"AI将自动提取您的信息",
    scanSuccess:"✅ 卡片扫描成功",
    scanDifferent:"🔄 扫描其他卡片",
    scanning:"🔍 AI扫描中…",
    sendSMS:"发送短信",
    smsSent:"消息已发送！",
    callEnded:"通话结束",
    connected:"✅ 已连接",
    ringing:"📞 拨号中…",
    endCall:"结束通话",
    notified:"✓ 已通知",
    login:"登录",
    logout:"退出登录",
    loginTitle:"欢迎使用Care911",
    loginSub:"登录以保存您的个人资料",
    email:"电子邮件",
    password:"密码",
    name:"姓名",
    createAccount:"创建账户",
    alreadyHave:"已有账户？",
    dontHave:"没有账户？",
    profile:"我的个人资料",
    darkMode:"深色模式",
    lightMode:"浅色模式",
    language:"语言",
    notifications:"通知",
    pushEnabled:"推送通知已开启",
    pushDisabled:"开启推送通知",
    gpsTitle:"位置访问",
    gpsGrant:"授予位置权限",
    gpsGranted:"📍 位置已激活",
    voiceCmd:"语音指令",
    voiceListening:"🎙️ 正在聆听…",
    voiceActive:"🎙️ 语音已激活",
    voiceTap:"点击麦克风说话",
    voiceLang:"语音语言",
    severity:"严重程度",
    minor:"轻微",
    moderate:"中等",
    severe:"严重",
    wait:"等待",
    distance:"距离",
    rating:"评分",
    doctors:"医生",
    services:"服务",
    demographics:"👤 基本信息",
    injury:"🩹 受伤情况",
    medical:"💊 病史",
    firstName:"名",
    lastName:"姓",
    dob:"出生日期",
    gender:"性别",
    phone:"电话",
    bloodType:"血型",
    emailField:"电子邮件",
    allergies:"已知过敏",
    medications:"当前用药",
    injuryType:"伤害类型",
    notes:"附加说明",
    notesPlaceholder:"描述发生的事情…",
    provider:"保险提供商",
    memberId:"会员ID",
    groupNumber:"团体编号",
    holderName:"保单持有人姓名",
    planName:"计划名称",
    relationship:"关系",
    relation:"关系",
    addContactBtn:"+ 添加联系人",
    downloadForm:"📄 下载预填表格",
    addInsurance:"🛡️ 添加保险信息",
    quickPrompts:["今早胸痛","手割伤严重","扭伤脚踝","高烧39°C","孩子摔倒撞头"],
  },
  hi: {
    code:"hi-IN", flag:"🇮🇳", name:"हिंदी",
    appName:"केयर911",
    tagline:"अभी सहायता के लिए टैप करें",
    subTagline:"AI ट्राइएज → देखभाल खोजें → नेविगेट करें",
    getHelp:"अभी सहायता लें",
    aiTriage:"AI ट्राइएज",
    findCare:"खोजें",
    intake:"पंजीकरण",
    contacts:"संपर्क",
    insurance:"बीमा",
    settings:"सेटिंग्स",
    home:"होम",
    nearby:"क्षेत्र अवलोकन",
    facilities:"सुविधाएं",
    shortestWait:"सबसे कम प्रतीक्षा",
    closest:"सबसे नज़दीक",
    notifyAll:"सभी को सूचित करें",
    addContact:"संपर्क जोड़ें",
    saveInsurance:"बीमा जानकारी सहेजें",
    saveIntake:"सहेजें और फ़ॉर्म डाउनलोड करें",
    startNav:"नेविगेशन शुरू करें",
    navActive:"नेविगेशन सक्रिय",
    openMaps:"Google Maps में खोलें",
    callAhead:"पहले से कॉल करें",
    navigate:"नेविगेट करें",
    prefillIntake:"फ़ॉर्म भरें",
    notifyFamily:"परिवार को सूचित करें",
    openNow:"अभी खुला है",
    backToResults:"परिणामों पर वापस जाएं",
    triageTitle:"AI ट्राइएज",
    triageSub:"Claude द्वारा संचालित · 911 का विकल्प नहीं",
    triageGreeting:"👋 नमस्ते! मैं आपका Care911 ट्राइएज सहायक हूं। अपने लक्षण बताएं और मैं तत्कालता का मूल्यांकन करने में मदद करूंगा।",
    triagePlaceholder:"अपने लक्षण बताएं…",
    findBestFacility:"🏥 अभी सर्वश्रेष्ठ सुविधा खोजें",
    scanCard:"📷 कार्ड स्कैन करें",
    enterManually:"✍️ मैन्युअल रूप से दर्ज करें",
    scanCardTitle:"बीमा कार्ड स्कैन करें",
    scanCardSub:"कार्ड के सामने की तस्वीर लें या अपलोड करें",
    scanCardAI:"AI आपकी जानकारी स्वचालित रूप से निकालेगा",
    scanSuccess:"✅ कार्ड सफलतापूर्वक स्कैन किया गया",
    scanDifferent:"🔄 दूसरा कार्ड स्कैन करें",
    scanning:"🔍 AI से स्कैन हो रहा है…",
    sendSMS:"SMS भेजें",
    smsSent:"संदेश भेजा गया!",
    callEnded:"कॉल समाप्त",
    connected:"✅ कनेक्ट हो गया",
    ringing:"📞 रिंग हो रहा है…",
    endCall:"कॉल समाप्त करें",
    notified:"✓ सूचित किया",
    login:"साइन इन करें",
    logout:"साइन आउट करें",
    loginTitle:"Care911 में आपका स्वागत है",
    loginSub:"अपनी प्रोफ़ाइल सहेजने के लिए साइन इन करें",
    email:"ईमेल",
    password:"पासवर्ड",
    name:"नाम",
    createAccount:"खाता बनाएं",
    alreadyHave:"पहले से खाता है?",
    dontHave:"खाता नहीं है?",
    profile:"मेरी प्रोफ़ाइल",
    darkMode:"डार्क मोड",
    lightMode:"लाइट मोड",
    language:"भाषा",
    notifications:"सूचनाएं",
    pushEnabled:"पुश सूचनाएं सक्षम",
    pushDisabled:"पुश सूचनाएं सक्षम करें",
    gpsTitle:"स्थान पहुंच",
    gpsGrant:"GPS पहुंच दें",
    gpsGranted:"📍 स्थान सक्रिय",
    voiceCmd:"वॉयस कमांड",
    voiceListening:"🎙️ सुन रहा है…",
    voiceActive:"🎙️ वॉयस सक्रिय",
    voiceTap:"बोलने के लिए माइक टैप करें",
    voiceLang:"वॉयस भाषा",
    severity:"गंभीरता",
    minor:"हल्का",
    moderate:"मध्यम",
    severe:"गंभीर",
    wait:"प्रतीक्षा",
    distance:"दूरी",
    rating:"रेटिंग",
    doctors:"डॉक्टर",
    services:"सेवाएं",
    demographics:"👤 जानकारी",
    injury:"🩹 चोट",
    medical:"💊 चिकित्सा",
    firstName:"पहला नाम",
    lastName:"अंतिम नाम",
    dob:"जन्म तिथि",
    gender:"लिंग",
    phone:"फ़ोन",
    bloodType:"रक्त प्रकार",
    emailField:"ईमेल",
    allergies:"ज्ञात एलर्जी",
    medications:"वर्तमान दवाएं",
    injuryType:"चोट का प्रकार",
    notes:"अतिरिक्त नोट्स",
    notesPlaceholder:"क्या हुआ बताएं…",
    provider:"बीमा प्रदाता",
    memberId:"सदस्य ID",
    groupNumber:"समूह संख्या",
    holderName:"पॉलिसी धारक का नाम",
    planName:"योजना का नाम",
    relationship:"संबंध",
    relation:"संबंध",
    addContactBtn:"+ संपर्क जोड़ें",
    downloadForm:"📄 प्री-फिल्ड फ़ॉर्म डाउनलोड करें",
    addInsurance:"🛡️ बीमा जानकारी जोड़ें",
    quickPrompts:["सुबह से सीने में दर्द","हाथ बुरी तरह कट गया","टखना मुड़ गया","तेज़ बुखार 102°F","बच्चा गिरा और सिर लगा"],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const facilities = [
  { id:1, name:"CityMed Urgent Care",  type:"Urgent Care", distance:"0.8 mi", wait:"12 min", address:"1240 Oak Street, Suite 100", phone:"(555) 234-5678", open:true, hours:"8AM–10PM",  physicians:3,  rating:4.8, services:["X-Ray","Lab Work","Minor Surgery","Pediatrics"],           mapUrl:"https://maps.google.com/?q=1240+Oak+Street" },
  { id:2, name:"St. Mary's Hospital",  type:"Hospital",    distance:"1.4 mi", wait:"28 min", address:"450 W. Grand Ave",             phone:"(555) 345-6789", open:true, hours:"24/7",      physicians:12, rating:4.6, services:["Emergency","Trauma","ICU","Radiology","Surgery"],          mapUrl:"https://maps.google.com/?q=450+W+Grand+Ave" },
  { id:3, name:"QuickClinic Express",  type:"Urgent Care", distance:"2.1 mi", wait:"5 min",  address:"88 Harbor Blvd",               phone:"(555) 456-7890", open:true, hours:"7AM–11PM",  physicians:2,  rating:4.4, services:["Walk-in","X-Ray","Lab Work","Occupational"],               mapUrl:"https://maps.google.com/?q=88+Harbor+Blvd" },
  { id:4, name:"Metro Health Center",  type:"Hospital",    distance:"3.2 mi", wait:"45 min", address:"2200 Broadway",                phone:"(555) 567-8901", open:true, hours:"24/7",      physicians:18, rating:4.7, services:["Emergency","Cardiology","Orthopedics","Neurology"],        mapUrl:"https://maps.google.com/?q=2200+Broadway" },
];
const injuryTypes = ["Cut / Laceration","Fracture / Broken Bone","Sprain / Strain","Burn","Head Injury","Chest Pain","Breathing Difficulty","Allergic Reaction","Fever / Infection","Abdominal Pain","Eye Injury","Other"];

// ─────────────────────────────────────────────────────────────────────────────
// THEME FACTORY (dark / light)
// ─────────────────────────────────────────────────────────────────────────────
const makeTheme = (dark) => ({
  bg:        dark ? "#09101f"                  : "#f0f4ff",
  surface:   dark ? "rgba(255,255,255,0.04)"   : "rgba(255,255,255,0.85)",
  surfaceHi: dark ? "rgba(255,255,255,0.08)"   : "rgba(255,255,255,1)",
  border:    dark ? "rgba(255,255,255,0.08)"   : "rgba(0,0,0,0.08)",
  borderHi:  dark ? "rgba(255,255,255,0.18)"   : "rgba(0,0,0,0.15)",
  text:      dark ? "#e8eaf6"                  : "#1a1f3a",
  muted:     dark ? "rgba(255,255,255,0.42)"   : "rgba(26,31,58,0.5)",
  faint:     dark ? "rgba(255,255,255,0.09)"   : "rgba(0,0,0,0.06)",
  inputBg:   dark ? "rgba(255,255,255,0.06)"   : "rgba(255,255,255,0.9)",
  headerBg:  dark ? "linear-gradient(135deg,#0d1b3e,#1a0a2e)" : "linear-gradient(135deg,#1e3a8a,#1e40af)",
  navBg:     dark ? "rgba(9,16,31,0.97)"       : "rgba(240,244,255,0.97)",
  shadow:    dark ? "none"                     : "0 2px 16px rgba(0,0,0,0.08)",
  red:"#ff3b3b", redDim:"rgba(255,59,59,0.13)", redBorder:"rgba(255,59,59,0.35)",
  green:"#22c55e", greenDim:"rgba(34,197,94,0.12)",
  blue:"#3b82f6",  blueDim:"rgba(59,130,246,0.12)",
  amber:"#f59e0b",
});

// ─────────────────────────────────────────────────────────────────────────────
// STYLE FACTORY
// ─────────────────────────────────────────────────────────────────────────────
const makeS = (C) => ({
  app:    { fontFamily:"'DM Sans',sans-serif", background:C.bg, minHeight:"100vh", color:C.text, maxWidth:430, margin:"0 auto", position:"relative", overflow:"hidden" },
  header: { background:C.headerBg, padding:"13px 20px 11px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:`1px solid ${C.border}`, position:"sticky", top:0, zIndex:50, boxShadow:C.shadow },
  logoBox:{ width:33, height:33, background:"linear-gradient(135deg,#ff3b3b,#ff6b35)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, boxShadow:"0 0 14px rgba(255,59,59,0.45)" },
  logoText:{ fontSize:19, fontWeight:800, letterSpacing:"-0.5px" },
  liveBadge:{ background:C.redDim, border:`1px solid ${C.redBorder}`, borderRadius:20, padding:"3px 9px", fontSize:10, color:"#ff8080", display:"flex", alignItems:"center", gap:5 },
  scroll: { padding:"0 0 88px", overflowY:"auto", maxHeight:"calc(100vh - 58px)" },
  nav:    { position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, background:C.navBg, backdropFilter:"blur(20px)", borderTop:`1px solid ${C.border}`, display:"flex", padding:"7px 0 13px", zIndex:100 },
  navItem:(a)=>({ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:2, cursor:"pointer", opacity:a?1:0.38 }),
  pageTitle:{ fontSize:19, fontWeight:800, color:C.text, padding:"16px 16px 3px" },
  pageSub:  { fontSize:12, color:C.muted, padding:"0 16px 10px" },
  sLabel:   { fontSize:10, fontWeight:700, color:C.muted, letterSpacing:1.5, textTransform:"uppercase", padding:"14px 16px 7px" },
  card:(hi)=>({ margin:"0 16px 11px", background:hi?C.redDim:C.surface, border:`1px solid ${hi?C.redBorder:C.border}`, borderRadius:17, padding:15, cursor:"pointer", boxShadow:C.shadow }),
  label: { fontSize:11, fontWeight:600, color:C.muted, marginBottom:5, display:"block", letterSpacing:0.4 },
  input: { width:"100%", background:C.inputBg, border:`1px solid ${C.border}`, borderRadius:11, padding:"11px 13px", color:C.text, fontSize:13, fontFamily:"'DM Sans',sans-serif", outline:"none", boxSizing:"border-box", marginBottom:11 },
  row2:  { display:"grid", gridTemplateColumns:"1fr 1fr", gap:9 },
  btn:(v)=>({ padding:"12px 15px", borderRadius:13, border:"none", cursor:"pointer", fontWeight:700, fontSize:12, fontFamily:"'DM Sans',sans-serif", display:"flex", alignItems:"center", justifyContent:"center", gap:6,
    background: v==="primary"?"linear-gradient(135deg,#ff3b3b,#c0392b)":v==="success"?"linear-gradient(135deg,#22c55e,#16a34a)":v==="blue"?"linear-gradient(135deg,#3b82f6,#6366f1)":C.surfaceHi,
    color:"#fff", border: v==="ghost"?`1px solid ${C.border}`:"none",
  }),
  btnFull:(v)=>({ width:"100%", padding:"13px", borderRadius:13, border:`1px solid ${v==="ghost"?C.border:"transparent"}`, cursor:"pointer", fontWeight:700, fontSize:13, fontFamily:"'DM Sans',sans-serif", display:"flex", alignItems:"center", justifyContent:"center", gap:7,
    background: v==="primary"?"linear-gradient(135deg,#ff3b3b,#c0392b)":v==="success"?"linear-gradient(135deg,#22c55e,#16a34a)":v==="blue"?"linear-gradient(135deg,#3b82f6,#6366f1)":C.surfaceHi,
    color: v==="ghost"?C.text:"#fff",
  }),
  chip:(a,c)=>({ padding:"6px 13px", borderRadius:20, border:`1px solid ${a?(c||C.red):C.faint}`, background:a?`${(c||C.red)}22`:"transparent", color:a?(c||"#ff8080"):C.muted, fontSize:11, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap", fontFamily:"'DM Sans',sans-serif" }),
  banner:(c)=>({ margin:"0 16px 11px", background:`${c}16`, border:`1px solid ${c}40`, borderRadius:13, padding:"11px 15px", display:"flex", alignItems:"center", gap:9, fontSize:12, color:c, fontWeight:600 }),
  divider: { height:1, background:C.border, margin:"4px 16px" },
});

// ─────────────────────────────────────────────────────────────────────────────
// VOICE COMMAND HOOK
// ─────────────────────────────────────────────────────────────────────────────
function useVoice(langCode, onCommand) {
  const [listening, setListening]   = useState(false);
  const [transcript, setTranscript] = useState("");
  const [supported, setSupported]   = useState(false);
  const recogRef = useRef(null);

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    setSupported(!!SR);
  }, []);

  const start = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const r = new SR();
    r.lang = langCode;
    r.continuous = false;
    r.interimResults = false;
    r.onstart  = () => setListening(true);
    r.onend    = () => setListening(false);
    r.onerror  = () => setListening(false);
    r.onresult = (e) => {
      const t = e.results[0][0].transcript.toLowerCase().trim();
      setTranscript(t);
      onCommand(t);
    };
    recogRef.current = r;
    r.start();
  }, [langCode, onCommand]);

  const stop = useCallback(() => { recogRef.current?.stop(); setListening(false); }, []);

  return { listening, transcript, supported, start, stop };
}

// ─────────────────────────────────────────────────────────────────────────────
// SUBCOMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function AiTriage({ C, S, t, langCode }) {
  const initMsg = { role:"assistant", text: t.triageGreeting };
  const [msgs, setMsgs]           = useState([initMsg]);
  const [input, setInput]         = useState("");
  const [loading, setLoading]     = useState(false);
  const [recommendation, setRec]  = useState(null);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs]);

  const send = async (text) => {
    const userMsg = (text || input).trim();
    if (!userMsg || loading) return;
    setInput("");
    const newMsgs = [...msgs, { role:"user", text:userMsg }];
    setMsgs(newMsgs);
    setLoading(true);
    const apiMsgs = newMsgs.map(m=>({ role:m.role==="assistant"?"assistant":"user", content:m.text }));
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1000,
          system:`You are a medical triage assistant for the Care911 emergency care app. Respond in the same language the user writes in. Assess symptoms, ask 1-2 clarifying questions if needed, then give urgency: Minor/Moderate/Severe and facility type recommendation. End with JSON block:
<recommendation>{"urgency":"Minor|Moderate|Severe","facility":"Urgent Care|Hospital|ER|Call 911","reason":"brief reason"}</recommendation>
Be concise and reassuring. Always add: "⚠️ This is not a substitute for professional medical care."`,
          messages: apiMsgs,
        }),
      });
      const data = await res.json();
      const full = data.content?.map(b=>b.text||"").join("") || "Connection error. Call 911 for emergencies.";
      const recMatch = full.match(/<recommendation>([\s\S]*?)<\/recommendation>/);
      const clean = full.replace(/<recommendation>[\s\S]*?<\/recommendation>/g,"").trim();
      if (recMatch) { try { setRec(JSON.parse(recMatch[1].trim())); } catch(e){} }
      setMsgs(p=>[...p,{ role:"assistant", text:clean }]);
    } catch(e) {
      setMsgs(p=>[...p,{ role:"assistant", text:"Connection error. For emergencies please call 911." }]);
    }
    setLoading(false);
  };

  const uc = { Minor:C.green, Moderate:C.amber, Severe:C.red };

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"calc(100vh - 148px)" }}>
      <div style={{ flex:1, overflowY:"auto", padding:"10px 15px", display:"flex", flexDirection:"column", gap:9 }}>
        {msgs.map((m,i)=>(
          <div key={i} style={{ display:"flex", justifyContent:m.role==="user"?"flex-end":"flex-start" }}>
            <div style={{ maxWidth:"83%", padding:"9px 13px", borderRadius:m.role==="user"?"17px 17px 4px 17px":"17px 17px 17px 4px",
              background:m.role==="user"?"linear-gradient(135deg,#ff3b3b,#c0392b)":C.surfaceHi,
              fontSize:13, lineHeight:1.55, color:m.role==="user"?"#fff":C.text, border:`1px solid ${C.border}` }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display:"flex" }}>
            <div style={{ background:C.surfaceHi, borderRadius:"17px 17px 17px 4px", padding:"9px 15px", border:`1px solid ${C.border}` }}>
              <span style={{ color:C.muted, fontSize:18, letterSpacing:4 }}>···</span>
            </div>
          </div>
        )}
        {recommendation && (
          <div style={{ background:`${uc[recommendation.urgency]}16`, border:`1px solid ${uc[recommendation.urgency]}44`, borderRadius:15, padding:13 }}>
            <div style={{ fontWeight:800, color:uc[recommendation.urgency], fontSize:14, marginBottom:5 }}>
              {recommendation.urgency==="Severe"?"🚨":recommendation.urgency==="Moderate"?"⚠️":"✅"} {recommendation.urgency} — {recommendation.facility}
            </div>
            <div style={{ fontSize:12, color:C.muted, marginBottom:9 }}>{recommendation.reason}</div>
            <button style={S.btnFull("primary")}>{t.findBestFacility}</button>
          </div>
        )}
        <div ref={endRef}/>
      </div>

      {msgs.length === 1 && (
        <div style={{ padding:"0 15px 7px", display:"flex", gap:6, flexWrap:"wrap" }}>
          {t.quickPrompts.map(q=>(
            <button key={q} style={{ ...S.chip(false), fontSize:10, padding:"5px 9px" }} onClick={()=>send(q)}>{q}</button>
          ))}
        </div>
      )}

      <div style={{ padding:"7px 15px 10px", display:"flex", gap:7, borderTop:`1px solid ${C.border}` }}>
        <input style={{ ...S.input, marginBottom:0, flex:1, fontSize:12, padding:"9px 13px" }}
          placeholder={t.triagePlaceholder} value={input}
          onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}/>
        <button style={{ ...S.btn("primary"), padding:"9px 14px", borderRadius:11, flexShrink:0 }} onClick={()=>send()}>
          {loading?"⏳":"➤"}
        </button>
      </div>
    </div>
  );
}

function InsuranceCardScan({ C, S, t, onExtracted }) {
  const [scanning, setScanning] = useState(false);
  const [result, setResult]     = useState(null);
  const [preview, setPreview]   = useState(null);
  const fileRef = useRef(null);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const base64    = ev.target.result.split(",")[1];
      const mediaType = file.type || "image/jpeg";
      setPreview(ev.target.result);
      setScanning(true);
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method:"POST", headers:{ "Content-Type":"application/json" },
          body: JSON.stringify({
            model:"claude-sonnet-4-20250514", max_tokens:800,
            messages:[{ role:"user", content:[
              { type:"image", source:{ type:"base64", media_type:mediaType, data:base64 }},
              { type:"text",  text:`Extract insurance card info. Return ONLY valid JSON, no markdown:\n{"provider":"","memberId":"","groupNumber":"","holderName":"","planName":"","rxBin":"","phone":""}` }
            ]}]
          }),
        });
        const data  = await res.json();
        const text  = data.content?.map(b=>b.text||"").join("")||"{}";
        const clean = text.replace(/```json|```/g,"").trim();
        const parsed= JSON.parse(clean);
        setResult(parsed);
        if (onExtracted) onExtracted(parsed);
      } catch(e) {
        setResult({ error:"Could not extract. Please fill manually." });
      }
      setScanning(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input ref={fileRef} type="file" accept="image/*" style={{ display:"none" }} onChange={handleFile}/>
      {!preview
        ? <div onClick={()=>fileRef.current?.click()} style={{ margin:"0 16px 14px", background:C.blueDim, border:`1px dashed ${C.blue}66`, borderRadius:15, padding:"24px 16px", textAlign:"center", cursor:"pointer" }}>
            <div style={{ fontSize:34, marginBottom:7 }}>📷</div>
            <div style={{ fontWeight:700, color:C.blue, fontSize:13 }}>{t.scanCardTitle}</div>
            <div style={{ fontSize:11, color:C.muted, marginTop:3 }}>{t.scanCardSub}</div>
            <div style={{ fontSize:11, color:C.muted }}>{t.scanCardAI}</div>
          </div>
        : <div style={{ margin:"0 16px 14px" }}>
            <img src={preview} alt="card" style={{ width:"100%", borderRadius:11, border:`1px solid ${C.border}`, marginBottom:9 }}/>
            <button style={S.btnFull("ghost")} onClick={()=>{ setPreview(null); setResult(null); fileRef.current.value=""; }}>{t.scanDifferent}</button>
          </div>
      }
      {scanning && <div style={S.banner(C.blue)}><span style={{ fontSize:18 }}>🔍</span>{t.scanning}</div>}
      {result && !result.error && (
        <div style={{ margin:"0 16px 8px", background:C.greenDim, border:`1px solid ${C.green}40`, borderRadius:13, padding:13 }}>
          <div style={{ fontWeight:700, color:C.green, marginBottom:9, fontSize:12 }}>{t.scanSuccess}</div>
          {Object.entries(result).filter(([,v])=>v).map(([k,v])=>(
            <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:5 }}>
              <span style={{ color:C.muted, textTransform:"capitalize" }}>{k.replace(/([A-Z])/g," $1")}</span>
              <span style={{ color:C.text, fontWeight:600 }}>{v}</span>
            </div>
          ))}
        </div>
      )}
      {result?.error && <div style={S.banner(C.amber)}>⚠️ {result.error}</div>}
    </div>
  );
}

function SmsSim({ C, S, t, contact, facility, onClose }) {
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);
  const msg = `Hi ${contact.name}, this is a Care911 alert. Your family member is heading to ${facility?.name||"an urgent care facility"} at ${facility?.address||""}. Estimated wait: ${facility?.wait||"soon"}. They are receiving care now.`;
  const doSend = () => { setSending(true); setTimeout(()=>{ setSending(false); setSent(true); },1800); };
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.72)", zIndex:200, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
      <div style={{ background:C.bg, borderRadius:"19px 19px 0 0", padding:19, width:"100%", maxWidth:430, border:`1px solid ${C.border}` }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:13 }}>
          <div style={{ fontWeight:800, fontSize:15, color:C.text }}>📱 {t.sendSMS} — {contact.name}</div>
          <button style={{ background:"none", border:"none", color:C.muted, cursor:"pointer", fontSize:19 }} onClick={onClose}>✕</button>
        </div>
        <div style={{ background:C.surfaceHi, borderRadius:11, padding:11, marginBottom:13, fontSize:12, color:C.muted, lineHeight:1.6, border:`1px solid ${C.border}` }}>{msg}</div>
        {sent
          ? <div style={S.banner(C.green)}>✅ {t.smsSent} {contact.phone}</div>
          : <button style={S.btnFull("success")} onClick={doSend}>{sending?"⏳ …":`📨 ${t.sendSMS} ${contact.phone}`}</button>
        }
      </div>
    </div>
  );
}

function CallModal({ C, S, t, name, phone, onClose }) {
  const [stage, setStage] = useState("ringing");
  useEffect(()=>{ const a=setTimeout(()=>setStage("connected"),2000), b=setTimeout(()=>setStage("ended"),6000); return()=>{clearTimeout(a);clearTimeout(b);}; },[]);
  useEffect(()=>{ if(stage==="ended") setTimeout(onClose,1000); },[stage]);
  const col = { ringing:C.amber, connected:C.green, ended:C.muted };
  const lbl = { ringing:t.ringing, connected:t.connected, ended:t.callEnded };
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.82)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ background:C.bg, borderRadius:23, padding:30, width:290, textAlign:"center", border:`1px solid ${C.border}` }}>
        <div style={{ width:68, height:68, borderRadius:"50%", background:"linear-gradient(135deg,#3b82f6,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, margin:"0 auto 15px" }}>📞</div>
        <div style={{ fontWeight:800, fontSize:17, color:C.text, marginBottom:3 }}>{name}</div>
        <div style={{ fontSize:12, color:C.muted, marginBottom:14 }}>{phone}</div>
        <div style={{ fontWeight:700, color:col[stage], fontSize:13, marginBottom:22 }}>{lbl[stage]}</div>
        <button style={S.btnFull("primary")} onClick={onClose}>{t.endCall}</button>
      </div>
    </div>
  );
}

function NotifToast({ C, msg, onDone }) {
  useEffect(()=>{ const t=setTimeout(onDone, 3500); return()=>clearTimeout(t); },[]);
  return (
    <div style={{ position:"fixed", top:70, left:"50%", transform:"translateX(-50%)", zIndex:300, background:"linear-gradient(135deg,#1e3a8a,#1e40af)", border:"1px solid rgba(96,165,250,0.4)", borderRadius:14, padding:"11px 18px", display:"flex", alignItems:"center", gap:9, maxWidth:380, boxShadow:"0 8px 32px rgba(0,0,0,0.4)", animation:"slideDown 0.3s ease" }}>
      <span style={{ fontSize:20 }}>🔔</span>
      <span style={{ fontSize:13, color:"#fff", fontWeight:600 }}>{msg}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────────────────────
export default function Care911App() {
  // ── core state
  const [screen, setScreen]         = useState("login");
  const [dark, setDark]             = useState(true);
  const [langKey, setLangKey]       = useState("en");
  const t = LANGS[langKey];
  const C = makeTheme(dark);
  const S = makeS(C);

  // ── auth
  const [user, setUser]             = useState(null);
  const [authMode, setAuthMode]     = useState("login"); // login | register
  const [authForm, setAuthForm]     = useState({ name:"", email:"", password:"" });
  const [authError, setAuthError]   = useState("");

  // ── app state
  const [selectedFacility, setFacility] = useState(null);
  const [filter, setFilter]         = useState("all");
  const [sortBy, setSortBy]         = useState("distance");
  const [calledFacility, setCalledFac] = useState(false);
  const [pulse, setPulse]           = useState(true);
  const [activeTab, setActiveTab]   = useState("demographics");
  const [insTab, setInsTab]         = useState("manual");
  const [smsContact, setSmsContact] = useState(null);
  const [callTarget, setCallTarget] = useState(null);
  const [triageRec, setTriageRec]   = useState(null);
  const [routeStarted, setRouteStarted] = useState(false);
  const [gpsActive, setGpsActive]   = useState(false);
  const [gpsCoords, setGpsCoords]   = useState(null);
  const [pushEnabled, setPushEnabled] = useState(false);
  const [toast, setToast]           = useState(null);
  const [voiceLang, setVoiceLang]   = useState("en");

  const [intake, setIntake] = useState({ firstName:"", lastName:"", dob:"", gender:"", phone:"", email:"", injuryType:"", severity:"", notes:"", allergies:"", medications:"", bloodType:"" });
  const [insurance, setInsurance] = useState({ provider:"", memberId:"", groupNumber:"", holderName:"", relationship:"Self", planName:"", rxBin:"", cardPhone:"" });
  const [contacts, setContacts] = useState([
    { id:1, name:"Jane Doe",   relation:"Spouse", phone:"(555) 100-2000", notified:false },
    { id:2, name:"Robert Doe", relation:"Son",    phone:"(555) 200-3000", notified:false },
  ]);
  const [newContact, setNewContact] = useState({ name:"", relation:"", phone:"" });

  useEffect(()=>{ const id=setInterval(()=>setPulse(p=>!p),900); return()=>clearInterval(id); },[]);

  const showToast = (msg) => setToast(msg);

  // ── GPS
  const getGPS = () => {
    if (!navigator.geolocation) { showToast("GPS not supported on this device"); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => { setGpsActive(true); setGpsCoords({ lat:pos.coords.latitude, lng:pos.coords.longitude }); showToast(`📍 Location acquired: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`); },
      ()    => { showToast("Location access denied"); },
      { enableHighAccuracy:true }
    );
  };

  // ── Push notifications
  const enablePush = async () => {
    if (!("Notification" in window)) { showToast("Push not supported"); return; }
    const perm = await Notification.requestPermission();
    if (perm === "granted") {
      setPushEnabled(true);
      new Notification("Care911", { body:"Push notifications enabled! You'll get alerts for wait times & facility updates.", icon:"🚨" });
      showToast("🔔 Push notifications enabled!");
    } else {
      showToast("Notification permission denied");
    }
  };

  // ── Voice commands
  const handleVoiceCommand = useCallback((transcript) => {
    showToast(`🎙️ "${transcript}"`);
    const lower = transcript.toLowerCase();
    if (lower.match(/find|hospital|clinic|care|urgent|찾기|buscа|खोजें|查找/i))   { setScreen("finder");   return; }
    if (lower.match(/triage|symptom|hurt|pain|ai|लक्षण|症状|síntoma/i))            { setScreen("triage");   return; }
    if (lower.match(/intake|form|register|fill|फ़ॉर्म|表格|formulario/i))           { setScreen("intake");   return; }
    if (lower.match(/insurance|coverage|card|बीमा|保险|seguro/i))                  { setScreen("insurance");return; }
    if (lower.match(/contact|family|notify|call|संपर्क|联系|contacto/i))            { setScreen("contacts"); return; }
    if (lower.match(/home|start|main|होम|主页|inicio/i))                            { setScreen("home");     return; }
    if (lower.match(/route|navigate|direction|नेविगेट|导航|navegar/i))              { setScreen("route");    return; }
    if (lower.match(/setting|dark|light|language|सेटिंग|设置|ajustes/i))            { setScreen("settings"); return; }
    showToast("🎙️ Command not recognized — try 'Find care' or 'AI triage'");
  }, []);

  const { listening, supported: voiceSupported, start: startVoice, stop: stopVoice } = useVoice(LANGS[voiceLang].code, handleVoiceCommand);

  // ── Auth
  const doLogin = () => {
    if (!authForm.email || !authForm.password) { setAuthError("Please fill in all fields"); return; }
    setUser({ name: authForm.name || authForm.email.split("@")[0], email: authForm.email });
    setScreen("home");
    setAuthError("");
    showToast(`Welcome back! 👋`);
  };
  const doRegister = () => {
    if (!authForm.name || !authForm.email || !authForm.password) { setAuthError("Please fill in all fields"); return; }
    setUser({ name: authForm.name, email: authForm.email });
    setScreen("home");
    setAuthError("");
    showToast(`Account created! Welcome to Care911 👋`);
  };
  const doLogout = () => { setUser(null); setScreen("login"); };

  // ── PDF
  const generatePDF = () => {
    const content = `CARE911 — PATIENT INTAKE FORM\nGenerated: ${new Date().toLocaleString()}\n${"─".repeat(38)}\n\nPATIENT DEMOGRAPHICS\nName:        ${[intake.firstName,intake.lastName].filter(Boolean).join(" ")||"—"}\nDate of Birth: ${intake.dob||"—"}\nGender:      ${intake.gender||"—"}\nPhone:       ${intake.phone||"—"}\nEmail:       ${intake.email||"—"}\nBlood Type:  ${intake.bloodType||"—"}\n\nINJURY INFORMATION\nType:        ${intake.injuryType||"—"}\nSeverity:    ${intake.severity||"—"}\nNotes:       ${intake.notes||"—"}\n\nMEDICAL HISTORY\nAllergies:   ${intake.allergies||"None"}\nMedications: ${intake.medications||"None"}\n\nINSURANCE\nProvider:    ${insurance.provider||"—"}\nMember ID:   ${insurance.memberId||"—"}\nGroup #:     ${insurance.groupNumber||"—"}\nHolder:      ${insurance.holderName||"—"}\nPlan:        ${insurance.planName||"—"}\n\nFACILITY\n${selectedFacility?`${selectedFacility.name}\n${selectedFacility.address}\n${selectedFacility.phone}`:"Not yet selected"}\n\n${"─".repeat(38)}\nPre-filled via Care911. Please verify at check-in.`;
    const blob = new Blob([content],{type:"text/plain"});
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href=url; a.download="Care911_Intake_Form.txt"; a.click();
    showToast("📄 Form downloaded!");
  };

  const filteredFacilities = facilities
    .filter(f=>filter==="all"||f.type.toLowerCase().includes(filter))
    .sort((a,b)=>sortBy==="wait"?parseInt(a.wait)-parseInt(b.wait):sortBy==="rating"?b.rating-a.rating:parseFloat(a.distance)-parseFloat(b.distance));

  const navItems = [
    { id:"home",      icon:"🏠", label:t.home      },
    { id:"triage",    icon:"🤖", label:t.aiTriage  },
    { id:"finder",    icon:"🏥", label:t.findCare  },
    { id:"intake",    icon:"📋", label:t.intake    },
    { id:"contacts",  icon:"👥", label:t.contacts  },
  ];

  // ── RENDER SCREENS ─────────────────────────────────────────────────────────

  const Login = () => (
    <div style={{ minHeight:"100vh", background:C.headerBg, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ width:60, height:60, background:"linear-gradient(135deg,#ff3b3b,#ff6b35)", borderRadius:18, display:"flex", alignItems:"center", justifyContent:"center", fontSize:30, marginBottom:14, boxShadow:"0 0 24px rgba(255,59,59,0.5)" }}>🚨</div>
      <div style={{ fontSize:26, fontWeight:800, color:"#fff", marginBottom:4 }}>
        <span style={{ color:"#ff6b6b" }}>Care</span>911
      </div>
      <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)", marginBottom:28, textAlign:"center" }}>{t.loginSub}</div>

      <div style={{ width:"100%", maxWidth:340, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:20, padding:22 }}>
        <div style={{ display:"flex", gap:8, marginBottom:18 }}>
          {["login","register"].map(m=>(
            <button key={m} style={{ flex:1, padding:"9px", borderRadius:10, border:`1px solid ${authMode===m?"rgba(255,59,59,0.5)":"rgba(255,255,255,0.1)"}`, background:authMode===m?"rgba(255,59,59,0.15)":"transparent", color:authMode===m?"#ff8080":"rgba(255,255,255,0.5)", cursor:"pointer", fontWeight:700, fontSize:12, fontFamily:"'DM Sans',sans-serif" }}
              onClick={()=>{ setAuthMode(m); setAuthError(""); }}>
              {m==="login"?t.login:t.createAccount}
            </button>
          ))}
        </div>

        {authMode==="register" && (
          <>
            <label style={{ ...S.label, color:"rgba(255,255,255,0.5)" }}>{t.name}</label>
            <input style={{ ...S.input, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", color:"#fff" }}
              placeholder="John Doe" type="text" autoComplete="off" value={authForm.name}
              onFocus={e=>e.target.select()} onClick={e=>e.stopPropagation()}
              onChange={e=>setAuthForm(p=>({...p,name:e.target.value}))}/>
          </>
        )}
        <label style={{ ...S.label, color:"rgba(255,255,255,0.5)" }}>{t.email}</label>
        <input style={{ ...S.input, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", color:"#fff" }}
          placeholder="you@email.com" type="text" autoComplete="off" value={authForm.email}
          onFocus={e=>e.target.select()} onClick={e=>e.stopPropagation()}
          onChange={e=>setAuthForm(p=>({...p,email:e.target.value}))}/>
        <label style={{ ...S.label, color:"rgba(255,255,255,0.5)" }}>{t.password}</label>
        <input style={{ ...S.input, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", color:"#fff" }}
          placeholder="••••••••" type="password" autoComplete="off" value={authForm.password}
          onFocus={e=>e.target.select()} onClick={e=>e.stopPropagation()}
          onChange={e=>setAuthForm(p=>({...p,password:e.target.value}))}/>

        {authError && <div style={{ fontSize:12, color:"#ff8080", marginBottom:10, textAlign:"center" }}>{authError}</div>}
        <button style={{ ...S.btnFull("primary"), marginBottom:10 }} onClick={authMode==="login"?doLogin:doRegister}>
          {authMode==="login"?t.login:t.createAccount}
        </button>
        <div style={{ textAlign:"center", fontSize:11, color:"rgba(255,255,255,0.4)" }}>
          {authMode==="login"?t.dontHave:t.alreadyHave}{" "}
          <span style={{ color:"#ff8080", cursor:"pointer", fontWeight:700 }} onClick={()=>setAuthMode(authMode==="login"?"register":"login")}>
            {authMode==="login"?t.createAccount:t.login}
          </span>
        </div>
      </div>

      {/* Language selector on login */}
      <div style={{ display:"flex", gap:8, marginTop:22 }}>
        {Object.entries(LANGS).map(([k,l])=>(
          <button key={k} style={{ background:langKey===k?"rgba(255,59,59,0.2)":"rgba(255,255,255,0.07)", border:`1px solid ${langKey===k?"rgba(255,59,59,0.4)":"rgba(255,255,255,0.1)"}`, borderRadius:10, padding:"6px 10px", cursor:"pointer", fontSize:16 }}
            onClick={()=>setLangKey(k)}>{l.flag}</button>
        ))}
      </div>
    </div>
  );

  const Home = () => (
    <div>
      <div style={{ background:"linear-gradient(160deg,#0d1b3e,#1a0a2e,#09101f)", padding:"24px 20px 20px", textAlign:"center", position:"relative" }}>
        <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:300, height:260, background:"radial-gradient(circle,rgba(255,59,59,0.1),transparent 70%)", pointerEvents:"none" }}/>
        {user && <div style={{ fontSize:12, color:"rgba(255,255,255,0.5)", marginBottom:10 }}>👋 {user.name}</div>}
        <button
          style={{ width:124, height:124, borderRadius:"50%", background:"linear-gradient(135deg,#ff3b3b,#c0392b)", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", margin:"0 auto 9px", boxShadow:"0 0 0 13px rgba(255,59,59,0.08),0 0 0 26px rgba(255,59,59,0.04),0 8px 30px rgba(255,59,59,0.4)", fontSize:40, position:"relative", zIndex:1 }}
          onClick={()=>setScreen("triage")}>🚨</button>
        <div style={{ fontSize:12, fontWeight:700, color:"#fff", letterSpacing:2, textTransform:"uppercase" }}>{t.getHelp}</div>
        <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)", marginTop:2 }}>{t.subTagline}</div>
        {gpsActive && gpsCoords && <div style={{ fontSize:10, color:C.green, marginTop:6 }}>📍 {gpsCoords.lat.toFixed(4)}, {gpsCoords.lng.toFixed(4)}</div>}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9, padding:"13px 15px 0" }}>
        {[
          { icon:"🤖", title:t.aiTriage,   desc:t.subTagline, s:"triage"   },
          { icon:"🗺️", title:t.findCare,   desc:"Nearest facilities",    s:"finder"   },
          { icon:"📋", title:t.intake,     desc:"Pre-fill your info",    s:"intake"   },
          { icon:"🛡️", title:t.insurance,  desc:"Scan or enter coverage",s:"insurance"},
          { icon:"👥", title:t.contacts,   desc:"One-tap notify family", s:"contacts" },
          { icon:"⚙️", title:t.settings,   desc:"Theme, language, GPS",  s:"settings" },
        ].map(c=>(
          <div key={c.s} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:15, padding:"13px 12px", cursor:"pointer", boxShadow:C.shadow }} onClick={()=>setScreen(c.s)}>
            <div style={{ fontSize:22, marginBottom:6 }}>{c.icon}</div>
            <div style={{ fontWeight:700, fontSize:12, color:C.text, marginBottom:2 }}>{c.title}</div>
            <div style={{ fontSize:10, color:C.muted, lineHeight:1.4 }}>{c.desc}</div>
          </div>
        ))}
      </div>

      {triageRec && (
        <div style={{ margin:"13px 15px 0", background:`${triageRec.urgency==="Severe"?C.red:triageRec.urgency==="Moderate"?C.amber:C.green}16`, border:`1px solid ${triageRec.urgency==="Severe"?C.red:triageRec.urgency==="Moderate"?C.amber:C.green}44`, borderRadius:13, padding:13 }}>
          <div style={{ fontWeight:800, fontSize:13, color:triageRec.urgency==="Severe"?C.red:triageRec.urgency==="Moderate"?C.amber:C.green }}>
            {triageRec.urgency==="Severe"?"🚨":"⚠️"} AI: {triageRec.urgency} — {triageRec.facility}
          </div>
          <div style={{ fontSize:11, color:C.muted, marginTop:3 }}>{triageRec.reason}</div>
        </div>
      )}

      <div style={S.sLabel}>{t.nearby}</div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:9, padding:"0 15px 18px" }}>
        {[["4",t.facilities],["5 min",t.shortestWait],["0.8 mi",t.closest]].map(([n,l])=>(
          <div key={l} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:13, padding:"12px 9px", textAlign:"center", boxShadow:C.shadow }}>
            <div style={{ fontSize:20, fontWeight:800, color:"#ff6b6b" }}>{n}</div>
            <div style={{ fontSize:9, color:C.muted, marginTop:2 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const Triage = () => (
    <div>
      <div style={S.pageTitle}>{t.triageTitle}</div>
      <div style={S.pageSub}>{t.triageSub}</div>
      <AiTriage C={C} S={S} t={t} langCode={LANGS[langKey].code}/>
    </div>
  );

  const Finder = () => (
    <div>
      <div style={S.pageTitle}>{t.findCare}</div>
      <div style={S.pageSub}>{gpsActive?"📍 Using your live location":"Enable GPS for live distances"}</div>
      <div style={{ padding:"0 15px 9px", display:"flex", gap:7, overflowX:"auto" }}>
        {[{id:"all",l:"All"},{id:"urgent",l:"Urgent Care"},{id:"hospital",l:"Hospital"}].map(f=>(
          <button key={f.id} style={S.chip(filter===f.id)} onClick={()=>setFilter(f.id)}>{f.l}</button>
        ))}
        <button style={S.chip(false,C.blue)} onClick={()=>setSortBy(s=>s==="wait"?"rating":s==="rating"?"distance":"wait")}>
          {sortBy==="wait"?`⏱ ${t.wait}`:sortBy==="rating"?`⭐ ${t.rating}`:`📍 ${t.distance}`}
        </button>
      </div>
      {filteredFacilities.map(f=>{
        const w=parseInt(f.wait); const wc=w<=10?C.green:w<=25?C.amber:C.red;
        return (
          <div key={f.id} style={S.card(selectedFacility?.id===f.id)} onClick={()=>{setFacility(f);setScreen("facility");}}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:9 }}>
              <div>
                <div style={{ fontWeight:700, fontSize:14, color:C.text, marginBottom:2 }}>{f.name}</div>
                <div style={{ fontSize:11, color:C.muted }}>{f.type} · {f.distance}</div>
              </div>
              <div style={{ background:`${wc}16`, border:`1px solid ${wc}44`, color:wc, borderRadius:9, padding:"3px 9px", fontSize:11, fontWeight:700 }}>⏱ {f.wait}</div>
            </div>
            <div style={{ display:"flex", gap:12, fontSize:11, color:C.muted }}>
              <span>👨‍⚕️ {f.physicians} {t.doctors}</span><span>⭐ {f.rating}</span><span>🕐 {f.hours}</span>
            </div>
          </div>
        );
      })}
    </div>
  );

  const FacilityDetail = () => {
    const f = selectedFacility||facilities[0];
    return (
      <div>
        <div style={{ padding:"11px 15px 0", display:"flex", gap:7, alignItems:"center" }}>
          <button style={{ background:"none", border:"none", color:C.red, cursor:"pointer", fontSize:19, padding:0 }} onClick={()=>setScreen("finder")}>←</button>
          <span style={{ color:C.muted, fontSize:12 }}>{t.backToResults}</span>
        </div>
        <div style={{ background:C.headerBg, padding:"16px 18px 20px" }}>
          <div style={{ fontSize:20, fontWeight:800, color:"#fff", marginBottom:3 }}>{f.name}</div>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.5)", marginBottom:14 }}>📍 {f.address}</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:7 }}>
            {[[f.wait,t.wait],[`${f.physicians}`,t.doctors],[`${f.rating}`,t.rating],[f.distance,t.distance]].map(([v,l])=>(
              <div key={l} style={{ background:"rgba(255,255,255,0.07)", borderRadius:11, padding:"9px 7px", textAlign:"center" }}>
                <div style={{ fontSize:14, fontWeight:800, color:"#ff6b6b" }}>{v}</div>
                <div style={{ fontSize:9, color:"rgba(255,255,255,0.4)", marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        {calledFacility && <div style={S.banner(C.green)}>✅ {t.notifyAll} — they're expecting you!</div>}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9, padding:"13px 15px 0" }}>
          <button style={S.btn("primary")} onClick={()=>setCallTarget({name:f.name,phone:f.phone})}>📞 {t.callAhead}</button>
          <button style={S.btn("blue")}    onClick={()=>setScreen("route")}>🗺️ {t.navigate}</button>
          <button style={S.btn("ghost")}   onClick={()=>setScreen("intake")}>📋 {t.prefillIntake}</button>
          <button style={S.btn("ghost")}   onClick={()=>setScreen("contacts")}>👥 {t.notifyFamily}</button>
        </div>
        <div style={S.sLabel}>{t.services}</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, padding:"0 15px 14px" }}>
          {f.services.map(s=><span key={s} style={{ background:C.blueDim, border:`1px solid ${C.blue}33`, color:C.blue, borderRadius:7, padding:"3px 9px", fontSize:10, fontWeight:600 }}>{s}</span>)}
        </div>
        <div style={S.divider}/>
        <div style={{ padding:"9px 15px 18px", display:"flex", flexDirection:"column", gap:5 }}>
          <div style={{ fontSize:12, color:C.muted }}>📞 {f.phone}</div>
          <div style={{ fontSize:12, color:C.muted }}>🕐 {f.hours}</div>
          <div style={{ fontSize:12, display:"flex", alignItems:"center", gap:5 }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:C.green, display:"inline-block" }}/>
            <span style={{ color:C.green, fontWeight:600 }}>{t.openNow}</span>
          </div>
        </div>
      </div>
    );
  };

  const Intake = () => (
    <div>
      <div style={S.pageTitle}>{t.intake}</div>
      <div style={S.pageSub}>{[intake.firstName,intake.lastName].filter(Boolean).join(" ")||"Patient"}</div>
      <div style={{ display:"flex", padding:"0 15px 10px", gap:7, overflowX:"auto" }}>
        {[{id:"demographics",l:t.demographics},{id:"injury",l:t.injury},{id:"medical",l:t.medical}].map(tb=>(
          <button key={tb.id} style={S.chip(activeTab===tb.id)} onClick={()=>setActiveTab(tb.id)}>{tb.l}</button>
        ))}
      </div>
      {activeTab==="demographics" && (
        <div style={{ padding:"0 15px" }}>
          <div style={S.row2}>
            <div><label style={S.label}>{t.firstName}</label><input style={S.input} placeholder="John" value={intake.firstName} onChange={e=>setIntake(p=>({...p,firstName:e.target.value}))}/></div>
            <div><label style={S.label}>{t.lastName}</label> <input style={S.input} placeholder="Doe"  value={intake.lastName}  onChange={e=>setIntake(p=>({...p,lastName:e.target.value}))}/></div>
          </div>
          <div style={S.row2}>
            <div><label style={S.label}>{t.dob}</label><input style={S.input} type="date" value={intake.dob} onChange={e=>setIntake(p=>({...p,dob:e.target.value}))}/></div>
            <div><label style={S.label}>{t.gender}</label>
              <select style={{...S.input,appearance:"none"}} value={intake.gender} onChange={e=>setIntake(p=>({...p,gender:e.target.value}))}>
                <option value="">Select</option>{["Male","Female","Non-binary","Other"].map(g=><option key={g}>{g}</option>)}
              </select>
            </div>
          </div>
          <div style={S.row2}>
            <div><label style={S.label}>{t.phone}</label><input style={S.input} placeholder="(555) 000-0000" value={intake.phone} onChange={e=>setIntake(p=>({...p,phone:e.target.value}))}/></div>
            <div><label style={S.label}>{t.bloodType}</label>
              <select style={{...S.input,appearance:"none"}} value={intake.bloodType} onChange={e=>setIntake(p=>({...p,bloodType:e.target.value}))}>
                <option value="">Unknown</option>{["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(bt=><option key={bt}>{bt}</option>)}
              </select>
            </div>
          </div>
          <label style={S.label}>{t.emailField}</label>
          <input style={S.input} placeholder="john@email.com" value={intake.email} onChange={e=>setIntake(p=>({...p,email:e.target.value}))}/>
        </div>
      )}
      {activeTab==="injury" && (
        <div style={{ padding:"0 15px" }}>
          <label style={S.label}>{t.injuryType}</label>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:7, marginBottom:11 }}>
            {injuryTypes.map(it=>(
              <button key={it} style={{ padding:"9px", borderRadius:9, border:`1px solid ${intake.injuryType===it?C.redBorder:C.border}`, background:intake.injuryType===it?C.redDim:C.surface, color:intake.injuryType===it?"#ff8080":C.muted, cursor:"pointer", fontSize:11, fontWeight:600, fontFamily:"'DM Sans',sans-serif", textAlign:"center" }}
                onClick={()=>setIntake(p=>({...p,injuryType:it}))}>{it}</button>
            ))}
          </div>
          <label style={S.label}>{t.severity}</label>
          <div style={{ display:"flex", gap:7, marginBottom:11 }}>
            {[{label:t.minor,color:C.green},{label:t.moderate,color:C.amber},{label:t.severe,color:C.red}].map(sv=>(
              <button key={sv.label} style={{ flex:1, padding:"9px 5px", borderRadius:9, border:`1px solid ${intake.severity===sv.label?sv.color:C.border}`, background:intake.severity===sv.label?`${sv.color}22`:C.surface, color:intake.severity===sv.label?sv.color:C.muted, cursor:"pointer", fontWeight:700, fontSize:11, fontFamily:"'DM Sans',sans-serif" }}
                onClick={()=>setIntake(p=>({...p,severity:sv.label}))}>{sv.label}</button>
            ))}
          </div>
          <label style={S.label}>{t.notes}</label>
          <textarea style={{...S.input,minHeight:75,resize:"none"}} placeholder={t.notesPlaceholder} value={intake.notes} onChange={e=>setIntake(p=>({...p,notes:e.target.value}))}/>
        </div>
      )}
      {activeTab==="medical" && (
        <div style={{ padding:"0 15px" }}>
          <label style={S.label}>{t.allergies}</label>
          <input style={S.input} placeholder="e.g. Penicillin, Latex" value={intake.allergies} onChange={e=>setIntake(p=>({...p,allergies:e.target.value}))}/>
          <label style={S.label}>{t.medications}</label>
          <textarea style={{...S.input,minHeight:75,resize:"none"}} placeholder="List medications…" value={intake.medications} onChange={e=>setIntake(p=>({...p,medications:e.target.value}))}/>
        </div>
      )}
      <div style={{ padding:"11px 15px 22px", display:"flex", flexDirection:"column", gap:9 }}>
        <button style={S.btnFull("primary")} onClick={generatePDF}>{t.downloadForm}</button>
        <button style={S.btnFull("ghost")}   onClick={()=>setScreen("insurance")}>{t.addInsurance}</button>
      </div>
    </div>
  );

  const Insurance = () => (
    <div>
      <div style={S.pageTitle}>{t.insurance}</div>
      <div style={S.pageSub}>Coverage info for faster check-in</div>
      <div style={{ display:"flex", padding:"0 15px 10px", gap:7 }}>
        <button style={S.chip(insTab==="scan",C.blue)} onClick={()=>setInsTab("scan")}>{t.scanCard}</button>
        <button style={S.chip(insTab==="manual")}      onClick={()=>setInsTab("manual")}>{t.enterManually}</button>
      </div>
      {insTab==="scan" && (
        <InsuranceCardScan C={C} S={S} t={t} onExtracted={(d)=>{
          setInsurance(p=>({...p,
            provider:d.provider||p.provider, memberId:d.memberId||p.memberId,
            groupNumber:d.groupNumber||p.groupNumber, holderName:d.holderName||p.holderName,
            planName:d.planName||p.planName, rxBin:d.rxBin||p.rxBin, cardPhone:d.phone||p.cardPhone,
          }));
          setInsTab("manual");
          showToast(t.scanSuccess);
        }}/>
      )}
      {insTab==="manual" && (
        <div style={{ padding:"0 15px" }}>
          <label style={S.label}>{t.provider}</label>
          <select style={{...S.input,appearance:"none"}} value={insurance.provider} onChange={e=>setInsurance(p=>({...p,provider:e.target.value}))}>
            <option value="">Select</option>
            {["Aetna","Blue Cross Blue Shield","Cigna","Humana","Kaiser","UnitedHealth","Medicare","Medicaid","Other"].map(x=><option key={x}>{x}</option>)}
          </select>
          <div style={S.row2}>
            <div><label style={S.label}>{t.memberId}</label>   <input style={S.input} placeholder="XYZ123" value={insurance.memberId}    onChange={e=>setInsurance(p=>({...p,memberId:e.target.value}))}/></div>
            <div><label style={S.label}>{t.groupNumber}</label> <input style={S.input} placeholder="GRP456" value={insurance.groupNumber} onChange={e=>setInsurance(p=>({...p,groupNumber:e.target.value}))}/></div>
          </div>
          <label style={S.label}>{t.holderName}</label>
          <input style={S.input} placeholder="Full name on policy" value={insurance.holderName} onChange={e=>setInsurance(p=>({...p,holderName:e.target.value}))}/>
          <div style={S.row2}>
            <div><label style={S.label}>{t.planName}</label><input style={S.input} placeholder="Gold PPO" value={insurance.planName} onChange={e=>setInsurance(p=>({...p,planName:e.target.value}))}/></div>
            <div><label style={S.label}>{t.relationship}</label>
              <select style={{...S.input,appearance:"none"}} value={insurance.relationship} onChange={e=>setInsurance(p=>({...p,relationship:e.target.value}))}>
                {["Self","Spouse","Dependent"].map(r=><option key={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <button style={S.btnFull("primary")} onClick={()=>showToast("✅ Insurance saved!")}>{t.saveInsurance}</button>
          <div style={{ height:22 }}/>
        </div>
      )}
    </div>
  );

  const Contacts = () => (
    <div>
      <div style={S.pageTitle}>{t.contacts}</div>
      <div style={S.pageSub}>Notify family & friends in one tap</div>
      <div style={{ padding:"0 15px 11px", display:"flex", flexDirection:"column", gap:8 }}>
        <button style={S.btnFull("primary")} onClick={()=>{ setContacts(p=>p.map(c=>({...c,notified:true}))); showToast("📢 All contacts notified!"); }}>
          📢 {t.notifyAll}
        </button>
      </div>
      {contacts.map(c=>(
        <div key={c.id} style={{ margin:"0 15px 9px", background:C.surface, border:`1px solid ${C.border}`, borderRadius:15, padding:13, display:"flex", alignItems:"center", gap:11, boxShadow:C.shadow }}>
          <div style={{ width:40, height:40, borderRadius:"50%", background:"linear-gradient(135deg,#3b82f6,#8b5cf6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, flexShrink:0 }}>👤</div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:700, fontSize:13, color:C.text }}>{c.name}</div>
            <div style={{ fontSize:11, color:C.muted }}>{c.relation} · {c.phone}</div>
          </div>
          {c.notified
            ? <span style={{ background:C.greenDim, border:`1px solid ${C.green}40`, color:C.green, borderRadius:7, padding:"3px 7px", fontSize:10, fontWeight:700 }}>✓ {t.notified}</span>
            : <div style={{ display:"flex", gap:5 }}>
                <button style={{ ...S.btn("ghost"), padding:"6px 9px", fontSize:12, borderRadius:9 }} onClick={()=>setCallTarget(c)}>📞</button>
                <button style={{ ...S.btn("success"), padding:"6px 9px", fontSize:12, borderRadius:9 }} onClick={()=>setSmsContact(c)}>💬</button>
              </div>
          }
        </div>
      ))}
      <div style={S.sLabel}>{t.addContact}</div>
      <div style={{ padding:"0 15px" }}>
        <div style={S.row2}>
          <div><label style={S.label}>{t.name}</label>    <input style={S.input} placeholder="Full name" value={newContact.name}     onChange={e=>setNewContact(p=>({...p,name:e.target.value}))}/></div>
          <div><label style={S.label}>{t.relation}</label> <input style={S.input} placeholder="Sister"    value={newContact.relation} onChange={e=>setNewContact(p=>({...p,relation:e.target.value}))}/></div>
        </div>
        <label style={S.label}>{t.phone}</label>
        <input style={S.input} placeholder="(555) 000-0000" value={newContact.phone} onChange={e=>setNewContact(p=>({...p,phone:e.target.value}))}/>
        <button style={S.btnFull("success")} onClick={()=>{ if(newContact.name&&newContact.phone){ setContacts(p=>[...p,{...newContact,id:Date.now(),notified:false}]); setNewContact({name:"",relation:"",phone:""}); showToast("✅ Contact added!"); }}}>
          {t.addContactBtn}
        </button>
        <div style={{ height:22 }}/>
      </div>
    </div>
  );

  const Route = () => {
    const f = selectedFacility||facilities[0];
    const steps = [
      { icon:"📍", text:"Start from your current location", dist:"Start" },
      { icon:"↗️", text:"Head north on Main St",            dist:"0.2 mi" },
      { icon:"↪️", text:"Turn right onto Oak Street",       dist:"0.4 mi" },
      { icon:"➡️", text:"Continue straight",                dist:"0.6 mi" },
      { icon:"🏥", text:`Arrive at ${f.name}`,              dist:f.distance },
    ];
    return (
      <div>
        <div style={{ padding:"11px 15px 0", display:"flex", gap:7, alignItems:"center" }}>
          <button style={{ background:"none", border:"none", color:C.red, cursor:"pointer", fontSize:18, padding:0 }} onClick={()=>setScreen("facility")}>←</button>
          <span style={{ color:C.muted, fontSize:12 }}>{t.backToResults}</span>
        </div>
        <div style={S.pageTitle}>{f.name}</div>
        <div style={S.pageSub}>~4 min · {f.distance}</div>
        <div style={{ margin:"0 15px 13px", background:C.headerBg, border:`1px solid ${C.border}`, borderRadius:16, height:170, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:7, position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${C.faint} 1px,transparent 1px),linear-gradient(90deg,${C.faint} 1px,transparent 1px)`, backgroundSize:"26px 26px" }}/>
          <div style={{ position:"relative", textAlign:"center" }}>
            <div style={{ fontSize:34 }}>🗺️</div>
            <div style={{ fontWeight:700, color:"#fff", fontSize:13, marginTop:5 }}>Live Navigation</div>
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)", marginTop:2 }}>Requires GPS access</div>
          </div>
          <div style={{ position:"absolute", bottom:9, left:9, right:9, background:C.redDim, border:`1px solid ${C.redBorder}`, borderRadius:9, padding:"6px 11px", display:"flex", justifyContent:"space-between" }}>
            <span style={{ color:"#ff8080", fontSize:11, fontWeight:700 }}>📍 → {f.name}</span>
            <span style={{ color:"#ff8080", fontSize:11, fontWeight:700 }}>~4 min</span>
          </div>
        </div>
        <div style={{ padding:"0 15px 3px" }}>
          {steps.map((s,i)=>(
            <div key={i} style={{ display:"flex", gap:9, marginBottom:11 }}>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                <div style={{ width:9, height:9, borderRadius:"50%", background:i===0||i===steps.length-1?C.red:C.faint, marginTop:4, flexShrink:0 }}/>
                {i<steps.length-1 && <div style={{ width:1, height:22, background:C.faint, marginTop:2 }}/>}
              </div>
              <div>
                <div style={{ fontSize:12, color:i===0||i===steps.length-1?C.text:C.muted, fontWeight:i===0||i===steps.length-1?700:400 }}>{s.icon} {s.text}</div>
                <div style={{ fontSize:10, color:"rgba(255,255,255,0.25)", marginTop:1 }}>{s.dist}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding:"3px 15px 22px", display:"flex", flexDirection:"column", gap:9 }}>
          <button style={S.btnFull(routeStarted?"success":"primary")} onClick={()=>{ setRouteStarted(true); showToast("🚗 Navigation started!"); }}>
            {routeStarted?`✅ ${t.navActive}`:`🚗 ${t.startNav}`}
          </button>
          <a href={f.mapUrl} target="_blank" rel="noreferrer" style={{ textDecoration:"none" }}>
            <button style={S.btnFull("blue")}>🗺️ {t.openMaps}</button>
          </a>
        </div>
      </div>
    );
  };

  const Settings = () => (
    <div>
      <div style={S.pageTitle}>{t.settings}</div>
      <div style={S.pageSub}>Personalize your Care911 experience</div>

      {/* Profile */}
      {user && (
        <div style={{ margin:"0 15px 11px", background:C.surface, border:`1px solid ${C.border}`, borderRadius:15, padding:15, boxShadow:C.shadow }}>
          <div style={{ display:"flex", alignItems:"center", gap:11, marginBottom:11 }}>
            <div style={{ width:44, height:44, borderRadius:"50%", background:"linear-gradient(135deg,#ff3b3b,#ff6b35)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>👤</div>
            <div>
              <div style={{ fontWeight:700, fontSize:14, color:C.text }}>{user.name}</div>
              <div style={{ fontSize:11, color:C.muted }}>{user.email}</div>
            </div>
          </div>
          <button style={S.btnFull("ghost")} onClick={doLogout}>🚪 {t.logout}</button>
        </div>
      )}

      {/* Theme */}
      <div style={S.sLabel}>{dark?t.darkMode:t.lightMode}</div>
      <div style={{ margin:"0 15px 11px", display:"flex", gap:9 }}>
        <button style={{ ...S.btnFull(dark?"primary":"ghost"), flex:1 }} onClick={()=>setDark(true)}>🌙 {t.darkMode}</button>
        <button style={{ ...S.btnFull(!dark?"blue":"ghost"), flex:1 }}   onClick={()=>setDark(false)}>☀️ {t.lightMode}</button>
      </div>

      {/* Language */}
      <div style={S.sLabel}>{t.language}</div>
      <div style={{ margin:"0 15px 11px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:9 }}>
        {Object.entries(LANGS).map(([k,l])=>(
          <button key={k} style={{ ...S.btnFull(langKey===k?"primary":"ghost"), fontSize:13 }} onClick={()=>setLangKey(k)}>
            {l.flag} {l.name}
          </button>
        ))}
      </div>

      {/* Voice Language */}
      <div style={S.sLabel}>{t.voiceLang}</div>
      <div style={{ margin:"0 15px 11px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:9 }}>
        {Object.entries(LANGS).map(([k,l])=>(
          <button key={k} style={{ ...S.btnFull(voiceLang===k?"blue":"ghost"), fontSize:12 }} onClick={()=>setVoiceLang(k)}>
            {l.flag} {l.name}
          </button>
        ))}
      </div>

      {/* GPS */}
      <div style={S.sLabel}>{t.gpsTitle}</div>
      <div style={{ margin:"0 15px 11px" }}>
        {gpsActive
          ? <div style={S.banner(C.green)}>✅ {t.gpsGranted} {gpsCoords&&`· ${gpsCoords.lat.toFixed(3)}, ${gpsCoords.lng.toFixed(3)}`}</div>
          : <button style={S.btnFull("blue")} onClick={getGPS}>📍 {t.gpsGrant}</button>
        }
      </div>

      {/* Notifications */}
      <div style={S.sLabel}>{t.notifications}</div>
      <div style={{ margin:"0 15px 11px" }}>
        {pushEnabled
          ? <div style={S.banner(C.green)}>🔔 {t.pushEnabled}</div>
          : <button style={S.btnFull("ghost")} onClick={enablePush}>🔔 {t.pushDisabled}</button>
        }
      </div>

      {/* Voice Command */}
      <div style={S.sLabel}>{t.voiceCmd}</div>
      <div style={{ margin:"0 15px 22px" }}>
        {!voiceSupported
          ? <div style={S.banner(C.amber)}>⚠️ Voice not supported in this browser</div>
          : <button
              style={{ ...S.btnFull(listening?"primary":"ghost"), border:listening?`1px solid ${C.red}`:undefined }}
              onClick={listening?stopVoice:startVoice}>
              {listening?t.voiceListening:`🎙️ ${t.voiceCmd}`}
            </button>
        }
        {voiceSupported && <div style={{ textAlign:"center", fontSize:11, color:C.muted, marginTop:7 }}>{t.voiceTap}</div>}
        {voiceSupported && (
          <div style={{ fontSize:11, color:C.muted, marginTop:6, textAlign:"center" }}>
            Say: "Find care" · "AI triage" · "My contacts" · "Insurance" · "Navigate"
          </div>
        )}
      </div>
    </div>
  );

  // ── ASSEMBLE ───────────────────────────────────────────────────────────────
  const screenMap = {
    login:<Login/>, home:<Home/>, triage:<Triage/>, finder:<Finder/>,
    facility:<FacilityDetail/>, intake:<Intake/>, insurance:<Insurance/>,
    contacts:<Contacts/>, route:<Route/>, settings:<Settings/>,
  };

  if (screen==="login") return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap" rel="stylesheet"/>
      <style>{`@keyframes slideDown{from{opacity:0;transform:translateX(-50%) translateY(-10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>
      <div style={{ fontFamily:"'DM Sans',sans-serif", background:C.bg, minHeight:"100vh", color:C.text, maxWidth:430, margin:"0 auto" }}>
        <Login/>
      </div>
    </>
  );

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap" rel="stylesheet"/>
      <style>{`@keyframes slideDown{from{opacity:0;transform:translateX(-50%) translateY(-10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>

      <div style={S.app}>
        {/* Header */}
        <div style={S.header}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={S.logoBox}>🚨</div>
            <div style={S.logoText}>
              <span style={{ color:"#ff6b6b" }}>Care</span>
              <span style={{ color:"#fff" }}>911</span>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            {voiceSupported && (
              <button
                style={{ background:listening?"rgba(255,59,59,0.25)":"rgba(255,255,255,0.07)", border:`1px solid ${listening?C.red:C.border}`, borderRadius:9, padding:"5px 9px", cursor:"pointer", fontSize:14, display:"flex", alignItems:"center", gap:4 }}
                onClick={listening?stopVoice:startVoice}
                title={t.voiceCmd}>
                🎙️
                {listening && <span style={{ fontSize:9, color:"#ff8080", fontWeight:700 }}>ON</span>}
              </button>
            )}
            <button style={{ background:"rgba(255,255,255,0.07)", border:`1px solid ${C.border}`, borderRadius:9, padding:"5px 9px", cursor:"pointer", fontSize:14 }}
              onClick={()=>setScreen("settings")}>⚙️</button>
            <div style={S.liveBadge}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:C.red, opacity:pulse?1:0.25, transition:"opacity 0.4s" }}/>
              LIVE
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={S.scroll}>{screenMap[screen]||screenMap["home"]}</div>

        {/* Bottom Nav */}
        <div style={S.nav}>
          {navItems.map(n=>(
            <div key={n.id} style={S.navItem(screen===n.id||(n.id==="finder"&&["facility","route"].includes(screen)))} onClick={()=>setScreen(n.id)}>
              <span style={{ fontSize:19 }}>{n.icon}</span>
              <span style={{ fontSize:9, fontWeight:700, letterSpacing:0.4, textTransform:"uppercase", color:C.text }}>{n.label}</span>
            </div>
          ))}
        </div>

        {/* Modals */}
        {smsContact && <SmsSim C={C} S={S} t={t} contact={smsContact} facility={selectedFacility} onClose={()=>{ setSmsContact(null); setContacts(p=>p.map(c=>c.id===smsContact.id?{...c,notified:true}:c)); }}/>}
        {callTarget && <CallModal C={C} S={S} t={t} name={callTarget.name} phone={callTarget.phone} onClose={()=>{ if(callTarget.id) setContacts(p=>p.map(c=>c.id===callTarget.id?{...c,notified:true}:c)); else setCalledFac(true); setCallTarget(null); }}/>}
        {toast && <NotifToast C={C} msg={toast} onDone={()=>setToast(null)}/>}
      </div>
    </>
  );
}
