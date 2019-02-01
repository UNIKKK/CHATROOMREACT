import React, { Component } from 'react';
import './Form.css';
import Message from '../Message/Message';
import firebase from 'firebase';


export default class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: null,
            message: '',
            list: [],
            imageUrl: '',
        };
        this.messageRef = firebase.database().ref().child('messages');
        this.listenMessages();


        // Create the ref
        this.fileInput = React.createRef();
        this.imgCanvas = React.createRef();

    }




    componentWillReceiveProps(nextProps) {
        if (nextProps.userName) {
            this.setState({userName: nextProps.userName.displayName});
        }
    }
    handleChange(event) {
        this.setState({message: event.target.value});
    }
    handleSend() {
        if (this.state.message) {
            var newItem = {
                userName: this.state.userName,
                message: this.state.message,
                imageUrl: this.state.imageUrl,
            }
            this.messageRef.push(newItem);
            this.setState({ message: '' });
        }
    }
    handleImage() {

        console.log("là", this.fileInput.current.files[0].name)
        console.log("là", this.fileInput)

        if (this.fileInput.current.files[0]) {
            const file = this.fileInput.current.files[0];
            //const reader = new FileReader();
            // TODO : check si c'est une image
            let img = new Image;
            img.src = URL.createObjectURL(file);
            console.log('img.src == ', img.src)
            console.log('refcanvas == ', this.imgCanvas)
            img.onload = () => {
                console.log('img onooaded')
                let canvas = this.imgCanvas
                let ctx = this.imgCanvas.current.getContext('2d');
                ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 100, 100)
                console.log('pouf', canvas)
                canvas.current.toBlob(blob => {

                    // inject into storage then send msg
                    firebase.storage().ref('images/').child(file.name)
                        .put(blob)
                        .then(snapshot => {
                            snapshot.ref.getDownloadURL()
                                .then(downloadURL => {
                                    this.setState({ imageUrl: downloadURL });
                                });
                        })

                }, 'image/webp', 0.8)

            };
        }
    }
    handleKeyPress(event) {
        if (event.key !== 'Enter') return;
        this.handleSend();
    }
    listenMessages() {
        this.messageRef
            .limitToLast(10)
            .on('value', message => {
                this.setState({
                    list: Object.values(message.val()),
                });
            });
    }

    isUser = (pseudo) => pseudo === this.state.user.displayName;

    render() {
        return (
            <div className="form">
                <div className="form__message">
                    {this.state.list.map((item, index) =>
                        <Message key={index} message={item} isUser={this.isUser} />
                    )}
                </div>

                <div className="form__row">
                    <input
                        className="form__input"
                        type="text"
                        placeholder="Taper votre message"
                        value={this.state.message}
                        onChange={this.handleChange.bind(this)}
                        onKeyPress={this.handleKeyPress.bind(this)}
                    />
                    <button
                        className="form__button"
                        onClick={this.handleSend.bind(this)}
                    >
                        Envoyer
          </button>
                </div>
                <canvas ref={this.imgCanvas}></canvas>
                <input type="file" ref={this.fileInput} onChange={this.handleImage.bind(this)}></input>
            </div>
        );
    }
}