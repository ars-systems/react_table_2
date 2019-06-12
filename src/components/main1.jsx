class Main extends React.Component {

    state = {
      eachPage: 30,
      data: null,
      pagesNumbers:0,
      page:1,
    };
  
    loadEmployees = () => {
  
      axios.get('https://alpha.compport.com/api/v1/employees')
        .then(response => {
          var data = []
          var i,j,temparray
          for (i=0,j=response.data.length; i<j; i+=this.state.eachPage) {
              temparray = response.data.slice(i,i+this.state.eachPage);
              data.push(temparray)
          }  
          var pagesNumbers = Math.ceil( response.data.length / this.state.eachPage ) 
          this.setState({
            data: data,
            pagesNumbers: pagesNumbers
          })
        })
        .catch(err => {
          console.log(err)
        }) 
    }
  
    componentDidMount() {
        this.loadEmployees()
    }
  
    componentWillUnmount(){
      this.loadEmployees = null
    }
  
    moveBack = () => {
      if(this.state.page <= 1) {
        return false
      }
  
      let prevPage= this.state.page - 1 
      this.setState({
        page:prevPage
      })
      // this.forceUpdate()
    
    }
  
    moveForward = () => {
      if(this.state.page >= this.state.pagesNumbers ){
        
          return false
      }
      let nextPage = this.state.page + 1   
      this.setState({
          page:nextPage
      })
      // this.forceUpdate()
    
    }
  
    changePage = (e) => { 
      
      let active = document.querySelectorAll(".active")
      active.forEach(elm => {
        elm.classList.remove("active")
      })
  
      e.target.classList.add("active")
  
      this.setState({
        page:parseInt(e.target.innerHTML) 
      }) 
  
    }
  
    render() {
     
      console.log(this.props.sortBy, this.props.searchVal)
  
      var pagination
      var pagesNumbers = []
      for(let i = 1; i <= this.state.pagesNumbers; i++ ){
        pagesNumbers.push(i)
      }
      
        if(pagesNumbers.length > 10 ){
          pagesNumbers.length = 5
            pagination = <div>
                <ul className = "pagination">
                    <li 
                      className = "prevButton"
                      onClick = {this.moveBack} > 
                    prev </li>
                                      
                    <li onClick = {this.changePage} >
                        {this.state.page === 1 ? parseInt( this.state.page ) : parseInt(this.state.page -1)} </li>
                    <li onClick = {this.changePage } >
                        {this.state.page === 1 ? parseInt( this.state.page + 1 ) : this.state.page} </li>
                    <li onClick = {this.changePage }>
                        {this.state.page === 1 ? parseInt( this.state.page + 2 ) : parseInt( this.state.page + 1 )}
                    </li>
                    {/* { pagesNumbers.map((page) => {
                      return  <li
                                  onClick = {this.changePage} 
                                  className = {page === this.state.page ? "active" : ""} 
                                  key = { page }>  { page } </li>
                    })}
                     */}
                    
                    <li
                      onClick = {this.moveForward} 
                      className = "nextButton" > 
                    next </li>
                </ul>
            </div>
        }
    
      if(this.state.data){
        return(
          <>
          <div className='info'>
            <table> 
              <thead>
                  <tr>
                      <th>#id</th>
                      <th>country</th>
                      <th>city</th>
                      <th>currency</th>
                      <th>company name</th>
                      <th>user id</th>
                      <th>gender</th>
                      <th>function</th>
                      <th>final salary</th>
                  </tr>
              </thead>
              <tbody>
  
                {this.state.data[this.state.page].map((employee, index) =>{
                return <tr key = { index } >
                          <td>{employee.id} </td>
                          <td>{employee.country}</td>
                          <td>{employee.city}</td>
                          <td>{employee.currency}</td>
                          <td>{employee.company_name}</td>
                          <td>{employee.user_id}</td>
                          <td>{employee.gender}</td>
                          <td>{employee.function}</td>
                          <td>{employee.final_salary}</td>  
                      </tr>
                })}
  
              </tbody>
            </table>
          </div>
            {this.state.pagesNumbers > 1 && pagination}
          </>
        )
      }else{
        return (
          <div className = "loading" > Loading ... </div>
        )
      }
    }
  }