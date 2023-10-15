import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
    return (
        <Modal>
            <Modal.Open
                renderOpen={(open) => (
                    <Button onClick={() => open("cabin-form")}>
                        Add new cabin
                    </Button>
                )}
            />
            <Modal.Window
                name="cabin-form"
                render={(close) => <CreateCabinForm onCloseModal={close} />}
            />

            <Modal.Open
                renderOpen={(open) => (
                    <Button onClick={() => open("table")}>Show table</Button>
                )}
            />
            <Modal.Window name="table" render={() => <CabinTable />} />
        </Modal>
    );
}

// function AddCabin() {
//     const [isOpenModal, setIsOpenModal] = useState(false);

//     return (
//         <div>
//             <Button onClick={() => setIsOpenModal((show) => !show)}>
//                 Add new cabin
//             </Button>
//             {isOpenModal && (
//                 <Modal onClose={() => setIsOpenModal(false)}>
//                     <CreateCabinForm
//                         onCloseModal={() => setIsOpenModal(false)}
//                     />
//                 </Modal>
//             )}
//         </div>
//     );
// }

export default AddCabin;
