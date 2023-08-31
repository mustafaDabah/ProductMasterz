import { Calendly } from '@/Components/UI'
import useClickOutsideAndEscape from '@/Hooks/useClickOutsideAndEscape';

function Popup({ show, closePopup, infoData }) {
    const { calendlyMeeting } = infoData[0].fields; 
    const popupRef = useClickOutsideAndEscape(closePopup);

    return (
        <div className={`overlay-module ${show ? 'show' : ''}`}>
            <div
                className={`modal fade game-modal ${show ? 'show fadeIn' : ''}`}
                id="App6"
            >
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content h-100 overflow-hidden" ref={popupRef}>
                        <div className="modal-header">

                            <button
                                type="button"
                                className="close"
                                onClick={closePopup}
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <Calendly url={calendlyMeeting} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup