import React from 'react';
import './App.css';

const modeOne = {
  'Q':{ kCode: 81, id: 'Chord 1', url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'},
  'W':{ kCode: 87, id: 'Chord 2', url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'},
  'E':{ kCode: 69, id: 'Chord 3', url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'},
  'A':{ kCode: 65, id: 'Shaker', url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'},
  'S':{ kCode: 83, id: 'Open HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'},
  'D':{ kCode: 68, id: 'Closed HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'},
  'Z':{ kCode: 90, id: 'Punchy Kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'},
  'X':{ kCode: 88, id: 'Side Stick', url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'},
  'C':{ kCode: 67, id: 'Snare', url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'}
  };
const modeTwo = {
  'Q':{ kCode: 81, id: 'Heater 1', url:'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'},
  'W':{ kCode: 87, id: 'Heater 2', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'},
  'E':{ kCode: 69, id: 'Heater 3', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'},
  'A':{ kCode: 65, id: 'Heater 4', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'},
  'S':{ kCode: 83, id: 'Clap', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'},
  'D':{ kCode: 68, id: 'Open HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'},
  'Z':{ kCode: 90, id: "Kick n' Hat", url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'},
  'X':{ kCode: 88, id: 'Kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'},
  'C':{ kCode: 67, id: 'Closed HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'}
  };


class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      power: true,
      switch: false,
      volume: "50",
      soundId: ' '
    }
    this.changeId = this.changeId.bind(this);
    this.switchMode = this.switchMode.bind(this);
    this.powerSwitch = this.powerSwitch.bind(this);
    this.adjustVolume = this.adjustVolume.bind(this)
  }
  changeId(name){
    this.setState({
      soundId: name 
    });
  }
  switchMode(){
    if(this.state.power){
       this.setState({
        switch: !this.state.switch
      });
    }
  }
  powerSwitch(){
    this.setState({
      power: !this.state.power,
      soundId: ' '
    });
  }
  adjustVolume(e){
    if (this.state.power) {
      this.setState({
        volume: e.target.value
      });
    }
    }

  render(){
    let arrayPad = ['Q','W','E','A','S','D','Z','X','C'];
    let DrumPads = arrayPad.map((p) => <DrumPad mode={this.state.switch} letters={p} id="display" newId={this.changeId} power={this.state.power}/>);
    return (
             <div id='drum-machine'>
               <Functionality name={this.state.soundId} 
                 mode={this.state.switch}
                 modeSwitch={this.switchMode}
                 power={this.state.power}
                 powerSwitch={this.powerSwitch}
                 volume={this.state.volume}
                 adjustVolume={this.adjustVolume} />
                <div id="drums">{DrumPads}</div>
             </div>
    );
  }
}

const Functionality = (props) => {
  let onClasses = props.power? ['screenOn', 'lightOn','On']: ['screenOff', 'lightOff','Off'];
  let mode = props.mode ? 'mode2': 'mode1';
  return (
    <div id="display">
      <p id={onClasses[0]}>{props.name}</p>
      <div className="switches">
      <div id="mode" onClick={props.modeSwitch}>
        <span>Mode Switch</span>
        <div id="mode-switch">
          <div id={mode}></div>
        </div>
      </div>
      <div id="power" onClick={props.powerSwitch}>{onClasses[2]}
      <div className={onClasses[1]}></div>
      </div>
      </div>
      <div id="mode">
      <span>Volume{(props.power) ? ": " + props.volume + "%" : " "}</span>
      <input type="range" min="0" max="100" step="1" value={props.volume} onChange={props.adjustVolume} />
      </div>
    </div>
  );
}

class DrumPad extends React.Component{
  constructor(props){
    super(props);
    this.handleKey = this.handleKey.bind(this);
    this.playSound = this.playSound.bind(this);
  } 
  playSound(){
    if(this.props.power){
      let sound = document.getElementById(this.props.letters);
      this.props.newId(this.Mode[this.props.letters].id);
      sound.currentTime = 0;
      sound.play();
    }
  }
  handleKey(e){
    if(e.keyCode === this.Mode[this.props.letters].kCode){
      this.playSound();
    }
  }
  componentDidMount(){
    document.addEventListener('keydown', this.handleKey);
  }
  componentWillUnmount(){
    document.removeEventListener('keydown', this.handleKey);
  }
  render(){
    let onClasses = this.props.power? 'drum-pad On': 'drum-pad Off';
    this.Mode = this.props.mode? modeTwo: modeOne; 
    return(
      <div className={onClasses} onClick={this.playSound} id={this.Mode[this.props.letters].id}>
        <p>{this.props.letters}</p>
        <audio src={this.Mode[this.props.letters].url} className="clip"  id={this.props.letters}></audio>
      </div>
    );
  } 
}



    export default App;
