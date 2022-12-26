//import { Component } from 'react';
//import logo from './logo.svg';
import { useEffect, useState } from 'react';
import CardList from './components/card-list/card-list.component'
import SearchBox from './components/search-box/search-box.component'
import './App.css';

const App = () => {

  const [searchField, setSearchField] = useState('');   //[value, setValue]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilteredMonsters(newFilteredMonsters);

  }, [monsters, searchField]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, [])

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }

  return (
    <div className="App">

      <h1 className='app-title'>Monsters Rolodex</h1>

      <SearchBox
        className='search-box'
        onChangeHandler={onSearchChange}
        placeholder='search Monsters'
      />

      {<CardList monsters={filteredMonsters}
      />}


    </div>
  );
};


/*class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ''
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) =>
        this.setState(
          () => {
            return { monsters: users };
          },
        )
      );
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField };
    })
  }


  /* render() {
 
     // console.log('render from Appjs');
     const { monsters, searchField } = this.state;
     const { onSearchChange } = this;
 
     const filteredMonsters = this.state.monsters.filter((monster) => {
       return monster.name.toLocaleLowerCase().includes(this.state.searchField);
     });
 
     return (
       <div className="App">
 
         <h1 className='app-title'>Monsters Rolodex</h1>
         <SearchBox
           className='search-box'
           onChangeHandler={onSearchChange}
           placeholder='search Monsters' />
         <CardList monsters={filteredMonsters} />
 
       </div>
     );
   }
}*/

export default App;
