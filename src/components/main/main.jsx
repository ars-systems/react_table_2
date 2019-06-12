import React from 'react';
import axios from "axios"
import './main.css';
import uuid from "uuid";


class Main extends React.Component {
  state = {
    currentPage: 1,
    PerPage: 30,
    data: [],
    isPrevBtnActive: 'disabled',
    isNextBtnActive: '',
    upperPageBound: 3,
    lowepagebound: 0,
    pagebound: 3
  }

  componentDidMount() {
    fetch('https://alpha.compport.com/api/v1/employees')
      .then(responce => responce.json())
      .then(data => {
        let arr = []
        data.forEach(elm => {
          arr.push(elm)
        });
        this.setState({
          data: arr
        })
      })
  }
  handleClick(e) {
    let listed = Number(e.target.id)
    this.setState({
      currentPage: listed
    })
    this.setPrevAndNextBtnClass(listed)
  }
  setPrevAndNextBtnClass(listed) {
    let totalPages = Math.ceil(this.state.data.length / this.state.PerPage)
    this.setState({ isNextBtnActive: 'disabled' });
    this.setState({ isPrevBtnActive: 'disabled' });
    if (totalPages === listed && totalPages > 1) {
      this.setState({ isPrevBtnActive: '' })
    }
    else if (listed === 1 && totalPages > 1) {
      this.setState({ isNextBtnActive: '' })
    }
    else if (totalPages > 1) {
      this.setState({ isPrevBtnActive: '' })
      this.setState({ isPrevBtnActive: '' })
    }
  }

  btnIncrementClick = () => {
    this.setState({ upperPageBound: this.state.upperPageBound + this.state.pagebound })
    this.setState({ lowepagebound: this.state.lowepagebound + this.state.pagebound })
    let listed = this.state.upperPageBound + 1;
    this.setState({ currentPage: listed });
    this.setPrevAndNextBtnClass(listed)
  }

  btnDecrementClick = () => {
    this.setState({ upperPageBound: this.state.upperPageBound - this.state.pagebound })
    this.setState({ lowepagebound: this.state.lowepagebound - this.state.pagebound })
    let listed = this.state.upperPageBound + this.state.pagebound
    this.setState({ currentPage: listed });
    this.setPrevAndNextBtnClass(listed)
  }

  btnPrevClick = () => {
    if ((this.state.currentPage - 1) % this.state.pagebound === 0) {
      this.setState({ upperPageBound: this.state.upperPageBound - this.state.pagebound })
      this.setState({ lowepagebound: this.state.lowepagebound - this.state.pagebound })
    }
    let listed = this.state.currentPage - 1
    this.setState({ currentPage: listed });
    this.setPrevAndNextBtnClass(listed)
  }

  btnNextClick = () => {
    if ((this.state.currentPage - 1) % this.state.pagebound === 0) {
      this.setState({ upperPageBound: this.state.upperPageBound + this.state.pagebound })
      this.setState({ lowepagebound: this.state.lowepagebound + this.state.pagebound })
    }
    let listed = this.state.currentPage + 1
    this.setState({ currentPage: listed });
    this.setPrevAndNextBtnClass(listed)
  }
  render() {
    console.log(this.state)

    const { currentPage, PerPage, data, isPrevBtnActive, isNextBtnActive, upperPageBound, lowepagebound, pagebound } = this.state
    const indexofLastperPage = currentPage * PerPage
    const indexofFirstperPage = indexofLastperPage - PerPage
    const currentData = data.slice(indexofFirstperPage, indexofLastperPage)
    const renderData = currentData.map((todo, index) => {
      return <tr key= {index}> 
 
        {
           Object.keys(todo).map((elm,ind) => {
             if(ind < 15){
              if(todo[elm][0] == "["){
              }
              else{
                if(ind == 0){
                  return <th key={ind}> {todo[elm]}</th>
                }
                else{
                  return <td key={ind}> {todo[elm]}</td>
                }
              }
            }else{
               return null
             }
           })
        }
      </tr>
    })

    const renderNames = currentData.map((todo, index) => {
      if(index == 1)
       return <tr key= {index}> 
 
        {
           Object.keys(todo).map((elm,ind) => {
             if(ind < 15){
              if(todo[elm][0] == "["){
              }
              else{
                return <th key={ind}> {elm}</th>
              }
            }else{
               return null
             }
           })
        }
      </tr>
    })

    const pagenumbers = []
    for (let i = 1; i <= Math.ceil(data.length / PerPage); i++) {
      pagenumbers.push(i)
    }

    const rendernumbers = pagenumbers.map((number) => {
      if (number === 1 && currentPage === 1) {
        return (
          <li key={number} className='active' id={number}><a href='#' id={number} onClick={(e) => this.handleClick(e)}>{number}</a></li>
        )
      }
      else if ((number < upperPageBound + 1) && number > lowepagebound) {
        return (
          <li key={number} id={number}><a href='#' id={number} onClick={(e) => this.handleClick(e)}>{number}</a></li>
        )
      }
    })

    let pageIncrementBtn
    if (pagenumbers.length > upperPageBound) {
      pageIncrementBtn = <li className=''><a href='#' onClick={this.btnIncrementClick}> &hellip; </a></li>
    }
    let pageDecrementBtn
    if (lowepagebound >= 1) {
      pageDecrementBtn = <li className=''><a href='#' onClick={this.btnDecrementClick}> &hellip; </a></li>
    }

    let renderPrevBtn
    if (isPrevBtnActive === 'disabled') {
      renderPrevBtn = <li className={isPrevBtnActive}><span>Prev</span></li>
    }
    else {
      renderPrevBtn = <li className={isPrevBtnActive}><a href='#' onClick={this.btnPrevClick}>Prev</a></li>
    }

    let renderNextBtn
    if (isNextBtnActive === 'disabled') {
      renderNextBtn = <li className={isNextBtnActive}><span>Next</span></li>
    }
    else {
      renderNextBtn = <li className={isNextBtnActive}><a href='#' onClick={this.btnNextClick}>Next</a></li>
    }


    return (
      <div>
        <div className="table">
        <table>
          <thead>
          {renderNames}
          </thead>
          <tbody>
          {renderData}
          </tbody>
        </table>
        </div>
        <ul className="buttons">
          {renderPrevBtn}
          {pageDecrementBtn}
          {rendernumbers}
          {pageIncrementBtn}
          {renderNextBtn}
        </ul>
      </div>
    )
  }

}

export default Main;