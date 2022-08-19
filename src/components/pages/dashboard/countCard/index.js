
import './overAllCountCard.scss'

export const OverAllCountCard = ({color='priamry',title="",count=0,icon=''}) => {

    return (
        <div className={`card  shadow h-100 py-2 overAllCountCard border-${color}`}>
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                        <div className={`text-count  text-${color}  mb-1`}>
                           {title}</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">{count}</div>
                    </div>
                    <div className="col-auto">
                        <i className={`fas ${icon} fa-2x count-icon text-${color}`}></i>
                    </div>
                </div>
            </div>
        </div>
    )


}