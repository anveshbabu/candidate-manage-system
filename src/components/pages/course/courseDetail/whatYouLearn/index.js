import CheckIcon from '@mui/icons-material/Check';
import './courseWhatYouLearn.scss'

export function CourseWhatYouLearn() {



    return (
        <div className="card whatYouLearn">

            <div className="card-body">
                <h5 className="card-title">What will you achieve?</h5>
                <div className='row'>
                    <div className='col-md-6'>
                        <ul className="list-group list-group-flush achieve-list">
                            <li className="list-group-item "><CheckIcon color='success' className='me-2'/> Create HTML and CSS files.</li>
                            <li className="list-group-item "><CheckIcon color='success' className='me-2'/> Use the functions of HTML & Cascading Style Sheets (CSS) in Web communications.</li>
                            <li className="list-group-item "><CheckIcon color='success' className='me-2'/> Describe the relationship between CSS and HTML.</li>
                        </ul>
                    </div>
                    <div className='col-md-6'>
                        <ul className="list-group list-group-flush achieve-list">
                            <li className="list-group-item "><CheckIcon color='success' className='me-2'/> Create, maintain, or modify HTML and CSS</li>
                            <li className="list-group-item "><CheckIcon color='success' className='me-2'/> Learn to use flexbox & CSS grid layout</li>
                            {/* <li className="list-group-item ">Describe the relationship between CSS and HTML.</li> */}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
}

