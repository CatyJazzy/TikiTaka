const { translate } = require('@vitalets/google-translate-api');
const fs = require('fs');
const path = require('path');

const translationsDir = path.join(__dirname, '../app/translations');
const sourceFile = path.join(translationsDir, 'en.json');
const targetLanguages = ['ko', 'zh', 'fr', 'ja', 'es', 'de'];

async function translateFile() {
  try {
    // 영어 소스 파일 읽기
    const sourceContent = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));
    
    // 각 대상 언어에 대해 번역
    for (const targetLang of targetLanguages) {
      const targetFile = path.join(translationsDir, `${targetLang}.json`);
      const translatedContent = {};

      // 재귀적으로 객체를 순회하며 번역
      async function translateObject(obj, path = '') {
        for (const [key, value] of Object.entries(obj)) {
          const currentPath = path ? `${path}.${key}` : key;
          
          if (typeof value === 'string') {
            try {
              // 문자열 번역
              const result = await translate(value, { to: targetLang });
              translatedContent[currentPath] = result.text;
              console.log(`번역 중: ${value} -> ${result.text}`);
            } catch (error) {
              console.error(`번역 실패 (${currentPath}):`, error);
              translatedContent[currentPath] = value; // 번역 실패시 원본 텍스트 유지
            }
          } else if (typeof value === 'object' && value !== null) {
            // 중첩된 객체 처리
            await translateObject(value, currentPath);
          }
        }
      }

      await translateObject(sourceContent);
      
      // 번역된 내용을 파일에 저장
      const formattedContent = {};
      for (const [key, value] of Object.entries(translatedContent)) {
        const keys = key.split('.');
        let current = formattedContent;
        for (let i = 0; i < keys.length - 1; i++) {
          current[keys[i]] = current[keys[i]] || {};
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
      }

      fs.writeFileSync(
        targetFile,
        JSON.stringify(formattedContent, null, 2),
        'utf8'
      );
      
      console.log(`번역 완료: ${targetLang}`);
    }
  } catch (error) {
    console.error('번역 중 오류 발생:', error);
  }
}

translateFile(); 