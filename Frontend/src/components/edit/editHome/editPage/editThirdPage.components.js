import React, { Component } from 'react'
import { handleError } from '../../../../utils/errorHandler';
import { httpClient } from '../../../../utils/httpClient';
import { notify } from '../../../../utils/toaster';
const IMG_URL = process.env.REACT_APP_IMG_URL;


const defaultForm = {
    title: '',
    description: '',
}

const validationFields = {
    title: '',
    description: '',
}
  
export class editThirdPage extends Component {
    constructor(){
        super();
        this.state = {
            data: {...defaultForm},
            error: {...validationFields},
            isLoading: false,
            fileToUpload: []

        }
    }
    componentDidMount(){
        this.productId = this.props.match.params['id'];
        httpClient.GET(`/page/third-pages/${this.productId}`, true)
        .then(res=>{
            this.setState({
                data: {
                    // ...defaultForm,
                    ...res.data
                }
            })
        })
        .catch(err=>{
            handleError(err);
        })
    }
    handleChange = e =>{
        let {name,value,type,files} = e.target;
        if(type === 'file'){
            console.log('file zero index>>', files)
            // Single File Upload
            return this.setState({
                fileToUpload: files
            })
        }
  
        this.setState(prestate=>({
          data:{
            ...prestate.data,
            [name]: value
          }
        }),()=>{
          //form validation here
        })
      }

      onSubmit = e =>{
        e.preventDefault();
        console.log('clicked')
        this.setState({
            isSubmitting: true
        })
        httpClient.UPLOAD('PUT',`/page/third-pages/${this.productId}`, this.state.data, this.state.fileToUpload)
            .then(res=>{
                notify.showInfo('content Updated');
                this.props.history.push('/edit-home')
            })
            .catch(err=>{
                notify.showError(err)
                this.setState({
                    isSubmitting: false
                })
            })
            .finally(()=>{
                this.setState({
                    isLoading: false
                })
            })
      }
  
    render() {
        console.log('second page ko DESCRIPTION >>', this.state.data)

        return (
            <section className='third-page container-fluid'>

               <form onSubmit={this.onSubmit} className='container-fluid form' noValidate>
               <div className='row'>
               <div className='col-12 col-lg-6 px-0 bg-dark'>
               <input type="file"  onChange={this.handleChange} className='form-control'/>
                    <img src={`${IMG_URL}/${this.state.data.img}`} className='img-fluid'/>
                 </div>
                 <div className='col-12 col-lg-3 pt-5 d-flex flex-column align-items-center d-lg-block'  style={{height: "80vh"}} >
                     <h1> Skill At Lisnutech Company </h1>
                 </div>
            <div className='col-12 col-lg-3 pt-5 pb-5 d-flex align-items-center flex-column d-lg-block' data-aos="fade-right" style={{background: "#000", color: "#fff", height: "80vh"}}>

                <label htmlFor="title"> Title  </label> <br />
               <input type="text" name="title" id="title" value={this.state.data.title || ''} onChange={this.handleChange} className='form-control' />
               <br />
               <label htmlFor="description"> Description  </label> <br />
                <textarea rows="8" type="text" name="description" id="description" value={this.state.data.description} onChange={this.handleChange} className='form-control' />
               </div>

              <button className='btn btn-primary mb-5 mt-2' style={{width: "20vw", height: "6vh"}}> Submit </button>
              </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
              </form>

            </section>
     
        )
    }
}
