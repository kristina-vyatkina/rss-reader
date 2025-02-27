const parseRSS = (xmlText: string) => {
  try {
      // Создаем XML парсер для обработки RSS-контента
    const parser = new DOMParser();
  
    // Парсим полученный текст в XML документ
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    // Извлекаем все элементы <item> из RSS-ленты     
    const items = xmlDoc.getElementsByTagName('item');
    const result = [];

    // Обрабатываем каждый элемент новости
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      result.push({
        // Извлекаем заголовок с fallback значением
        title: item.getElementsByTagName('title')[0]?.textContent || 'Без названия',
        // Извлекаем ссылку или используем заглушку 
        link: item.getElementsByTagName('link')[0]?.textContent || '#',
        // Основное содержание новости
        description: item.getElementsByTagName('description')[0]?.textContent || '',
        // Дата публикации в оригинальном формате
        pubDate: item.getElementsByTagName('pubDate')[0]?.textContent || ''
      });
    }
    
    return result;
  } catch (err) {
      // Обработка ошибок парсинга
    throw new Error('Ошибка парсинга RSS');
  }
};

export {
  parseRSS
}