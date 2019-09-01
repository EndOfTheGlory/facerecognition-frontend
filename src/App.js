import React,{Component} from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import InputUrl from './components/inputUrl/InputUrl';
import Rank from './components/rank/Rank';
import RecognizeFace from './components/RecognizeFace/RecognizeFace'
import SignIn from './components/signin/SignIn'
import Register from './components/register/Register'


const app = new Clarifai.App({
 apiKey: '849b25282bed4182bae60d7b3c05b3f2'
});

const particles = {
  particles: {
    number:{
      value:60,
      density:{
        enable: true,
        value_area: 561
      }
    },
    color:{
      value:'#0f3272'
    }
  },
  "interactivity": {
    "events": {
        "onhover": {
            "enable": true,
            "mode": "repulse"
        }
    }
  }
}

const initialState = {
  input: '',
      pictureUrl: '',
      boxFace: {},
      route: 'signin',
      authorized: false,
      user:{
        id: '',
        password: '',
        email: '',
        nickname: '',
        entries: 0,
        joined: ''
      }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState
  }

  // componentDidMount(){
  //   fetch('http://localhost:700/')
  //   .then(response => response.json())
  //   .then(console.log)
  // }

  findFace = (data) =>{
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputedimage');
    const widthImage = Number(image.width);
    const heightImage = Number(image.height);
    const scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    const scrollWidth = Math.max(
      document.body.scrollWidth, document.documentElement.scrollWidth,
      document.body.offsetWidth, document.documentElement.offsetWidth,
      document.body.clientWidth, document.documentElement.clientWidth
    );
    const visualHeight = document.documentElement.clientHeight;

    console.log(scrollWidth,scrollHeight)
    console.log(widthImage,heightImage)
    console.log(face)
    return { 
      leftCol: (scrollWidth/2 - widthImage/2) + (face.left_col * widthImage),
      topRow: (scrollHeight - heightImage) + (face.top_row * widthImage),
      rightCol: (scrollWidth/2 + widthImage/2) - (widthImage * face.right_col) ,//+ (face.right_col * widthImage)
      bottomRow: (visualHeight - scrollHeight) + heightImage - (heightImage * face.bottom_row) //because 0px at the bottom is the same as visual height
    }
  }
   // leftCol: face.left_col * widthImage,
   //    topRow: heightImage - (face.top_row * heightImage),
   //    rightCol: widthImage, //(face.right_col * widthImage)
   //    bottomRow: -(face.top_row * heightImage)

  createBox = (coordinates) => {
    this.setState({boxFace: coordinates});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  loadUser = (data) => {
    this.setState({user:{
      id: data.id,
      password: data.password,
      email: data.email,
      nickname: data.nickname,
      entries: data.entries,
      joined: data.joined
    }})
  }

  onButtonSumbit = () => {
    this.setState({pictureUrl: this.state.input});
      //For some reason can't fetch the url.So I am going back to the initial unsafe version,which is working
      // fetch('http://localhost:700/imageurl', {
      //   method: 'post',
      //   headers: {'Content-Type': 'application/json'},
      //   body: JSON.stringify({
      //     input: this.state.input
      //   })
      // })
      // .then(response => response.json())
    app.models
    .predict(
    Clarifai.FACE_DETECT_MODEL,
       this.state.input
    )
    .then(response => {
      if (response) {
        fetch('http://localhost:700/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })

        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(console.log);
      }
      this.createBox(this.findFace(response))
    })
    .catch(err => console.log('Whoops,there is an error!',err))
  }

  signedOrNot = (route) => {
    if (route === 'signout'){
      this.setState(initialState)
    }else if ( route === 'homepage'){
      this.setState({authorized:true})
    }
    this.setState({route: route})
  }


  render() {
    const { authorized, route, boxFace, pictureUrl} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particles}
        />
        <Navigation 
        didUserAuthorized = {authorized}
        signedOrNot = {this.signedOrNot}/>
        { route === 'homepage' 
          ? <div>
              <Logo />
              <Rank nickname = {this.state.user.nickname} entries = {this.state.user.entries} />
              <InputUrl 
              onInputChange = {this.onInputChange} 
              onButtonSumbit = {this.onButtonSumbit}
              />
              <RecognizeFace boxFace={boxFace} pictureUrl = {pictureUrl}/>
            </div>
          : (
            route === 'signin' ?
            <SignIn loadUser = { this.loadUser } signedOrNot = {this.signedOrNot}/> :
            <Register loadUser = { this.loadUser } signedOrNot = {this.signedOrNot}/>
            )
          
      }
      </div>
    );
  } 
}

export default App;
//849b25282bed4182bae60d7b3c05b3f2