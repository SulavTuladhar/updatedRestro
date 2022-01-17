import React, { Component } from 'react'
import { handleError } from '../../utils/errorHandler';
import { httpClient } from '../../utils/httpClient';
const IMG_URL = process.env.REACT_APP_IMG_URL;

export class ViewBlog extends Component {
    constructor(){
        super();
        this.state ={
            blog: [],
            isLoading: false
        }
    }

    componentDidMount(){
        this.setState({
            isLoading: true
        })
        this.contentId = this.props.match.params['id'];
        console.log('params >>', this.contentId)
        httpClient.GET(`/blog/${this.contentId}`)
            .then(res=>{
                this.setState({
                    blog: res.data
                })
            })
            .catch(err=>{
                handleError(err)
            })
            .finally(()=>{
                this.setState({
                    isLoading: false
                })
            })
    }

    render() {
        let content = this.state.isLoading
            ? <> <p> SHOWING LOADER </p> </>
            : <>
                        <div className='container-fluid text-center mb-5'>
                    <img src={`${IMG_URL}/${this.state.blog.img}`} className='img-fluid' alt='blog-img' />
                    </div>
                <div className='container col-11 col-md-8 col-sm-10 mb-5'>
                    <h1 className='mb-5'> {this.state.blog.title} </h1>
                    <p>
                        {this.state.blog.content}
                    </p>
                </div>
            </>
        console.log('stae ma k cha ta blog ko >>', this.state.blog)
        return (
            <section>
                        
                {content}
                        
            </section>
        )
    }
}
