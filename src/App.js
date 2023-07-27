import React from 'react';
import './index.scss';
import { Collection } from './components/Collection';

const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
];


function App() {
  const [categoryId, setCategoryId] = React.useState(0); // разделение по категориям
  const [page, setPage] = React.useState(1); // по страницам(пагинация)
  const [searchValue, setSearchValue] = React.useState('') // поиск состояние по буквам
  const [isLoading, setIsLoading] = React.useState(true); // загрузка
  const [collections, setCollections] = React.useState([ ]); // коллекция фото

  React.useEffect(() => { // api
    setIsLoading(true)

    const category = categoryId ? `category=${categoryId}` : '';
   


    fetch(`https://64c25a5beb7fd5d6ebcfaf9a.mockapi.io/photos?page=${page}&limit=3&${category}`)
    .then((res) => res.json())
    .then((json) => {
      setCollections(json);
    })
    .catch((err) => {
      console.warn(err);
      alert('Ошибка при получении данных');
    }).finally(() => setIsLoading(false));
  }, [categoryId,page]);

  return (
    <div className="App">
      <h1>Коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
          cats.map((obj, index) =>  (
          <li onClick={() => setCategoryId(index)}  // высвечивание при клике
          className={categoryId === index ? 'active' : ''}  // актив когда он включен
          key={obj.name}>{obj.name}</li> // название
          )
          )}
        </ul>
        <input value={searchValue} 
        onChange={(e) => setSearchValue(e.target.value)}  // поиск по буквам
        className="search-input" 
        placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading ? (
        <h2>Идет загрузка...</h2>) : (
          collections.filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase())) // фильтр по поисковику по буквам
      .map((obj, index) => (
      <Collection key={index} name={obj.name} images={obj.photos} />)) // генерация по фоткам и имени
        )} 
      
      </div>
      <ul className="pagination">
       {
        [...Array(3)].map((_, index) => ( // backend need for filter 
        <li onClick={()=> setPage(index + 1)} className={page === (index +1 ) ? 'active' : ''}>{index + 1}</li>)
        )
       }
      </ul>
    </div>
  );
}

export default App;
