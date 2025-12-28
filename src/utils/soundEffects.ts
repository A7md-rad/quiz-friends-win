// مولد أصوات بسيط باستخدام Web Audio API
let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
};

export const playBeep = (frequency: number = 800, duration: number = 0.1, volume: number = 0.3) => {
  try {
    const ctx = getAudioContext();
    
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch (error) {
    console.log('Audio not available:', error);
  }
};

// صوت العد التنازلي - يتصاعد كلما اقترب الوقت
export const playCountdownBeep = (secondsLeft: number) => {
  if (secondsLeft === 3) {
    playBeep(600, 0.15, 0.2); // صوت منخفض
  } else if (secondsLeft === 2) {
    playBeep(800, 0.15, 0.3); // صوت متوسط
  } else if (secondsLeft === 1) {
    playBeep(1000, 0.2, 0.4); // صوت عالي
  }
};

// صوت الإجابة الصحيحة
export const playCorrectSound = () => {
  try {
    const ctx = getAudioContext();
    
    // نغمة صاعدة للإجابة الصحيحة
    const oscillator1 = ctx.createOscillator();
    const oscillator2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator1.frequency.value = 523.25; // C5
    oscillator2.frequency.value = 659.25; // E5
    oscillator1.type = 'sine';
    oscillator2.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    
    oscillator1.start(ctx.currentTime);
    oscillator2.start(ctx.currentTime + 0.1);
    oscillator1.stop(ctx.currentTime + 0.2);
    oscillator2.stop(ctx.currentTime + 0.3);
  } catch (error) {
    console.log('Audio not available:', error);
  }
};

// صوت الإجابة الخاطئة
export const playWrongSound = () => {
  try {
    const ctx = getAudioContext();
    
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = 200;
    oscillator.type = 'sawtooth';
    
    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);
  } catch (error) {
    console.log('Audio not available:', error);
  }
};

// صوت انتهاء الوقت
export const playTimeUpSound = () => {
  try {
    const ctx = getAudioContext();
    
    // صوت إنذار قصير
    [0, 0.15, 0.3].forEach((delay) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.value = 400;
      oscillator.type = 'square';
      
      gainNode.gain.setValueAtTime(0.15, ctx.currentTime + delay);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + 0.1);
      
      oscillator.start(ctx.currentTime + delay);
      oscillator.stop(ctx.currentTime + delay + 0.1);
    });
  } catch (error) {
    console.log('Audio not available:', error);
  }
};
