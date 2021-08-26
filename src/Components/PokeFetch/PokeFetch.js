import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      counter: 10,
    }
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))
  }

  countdown() {
    this.myInterval = setInterval(() => {
      this.setState({ counter: this.state.counter - 1})
      if (this.state.counter === 0) {
        clearInterval(this.myInterval)
      } else if (this.state.counter < null) {
        this.setState({ counter: this.state.counter + 10})
      }
    }, 1000)
  }


  render() {
    const { counter } = this.state;
    if (counter === 0) {
      return (
        <div className={'wrapper'}>
          <button className={'start'} onClick={() => {
            this.fetchPokemon();
            this.countdown()
          }}>Start!</button>
          <h1 className={'timer'} >Play again!{counter}</h1>
          <div className={'pokeWrap'}>
            <img className={'pokeImg'} src={this.state.pokeSprite} />
            <h1 style={{ color: 'black' }} className={'pokeName'}>{this.state.pokeName}</h1>
          </div>
        </div>
      )
    } else {
      return (
        <div className={'wrapper'}>
          <button className={'start'} onClick={() => {
            this.fetchPokemon();
            this.countdown()
          }}>Start!</button>
          <h1 className={'timer'}>Guess that pokemon?<br />{counter}s</h1>
          <div className={'pokeWrap'}>
            <img style={{ filter: 'contrast(1%)' }} className={'pokeImg'} src={this.state.pokeSprite} />
            <h1 style={{ color: 'transparent' }} className={'pokeName'}>{this.state.pokeName}</h1>
          </div>
        </div>
      )
    }
  }
}

export default PokeFetch;