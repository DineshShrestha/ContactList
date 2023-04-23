import logo from '../../images/react.png'

const Header=()=>{
    return (
      <>
      <div className='pt-2 py-1 pl-2' style={{borderBottom: "1px solid #777"}}>
        <img src={logo} style={{height: "35px", verticalAlign: "top"}} alt="React image"/>
        <span className="h2 pt-4 m-2 text-white-50 ">Contactopedia</span>

      </div>
     </>
    )
  }
export default Header;