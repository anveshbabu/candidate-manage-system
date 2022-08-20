
import './bredcrumb.scss';
import {NormalButton} from '../button'
export const NormalBreadcrumb = (props) => {

  let {
    label = '',
    className = '',
    rightSideBtn=false,
    buttonLabel='',
    onBtnClick,
    btnIsLoader=false,
    rightSideChild,
  } = props;

  return (
    <nav className={`app-breadcrumb ${className}`} >
      <div className='row'>
        <div className='col-sm-12 col-md-6'>
          <ol className={`breadcrumb `}>
            <li className="breadcrumb-item active" aria-current="page">{label}</li>
          </ol>
        </div>
        <div className='col-sm-12 col-md-6 text-end '>
       {rightSideBtn &&  <NormalButton  isLoader={btnIsLoader} onClick={onBtnClick} label={buttonLabel} className='add-new-btn' size="small"  variant="outlined"/> }
       {rightSideChild && rightSideChild }
        </div>
      </div>

    
    </nav>
  )
}
