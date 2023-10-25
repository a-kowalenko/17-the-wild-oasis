import styled from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { formatCurrency } from "../../utils/helpers";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Price = styled.div`
    font-family: "Sono";
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
    const { isCreating, createCabin } = useCreateCabin();
    const { isDeleting, deleteCabin } = useDeleteCabin();

    const {
        id: cabinId,
        name,
        maxCapacity,
        regularPrice,
        discount,
        image,
        description,
    } = cabin;

    function handleDuplicate() {
        createCabin({
            name: `Copy of ${name}`,
            maxCapacity,
            regularPrice,
            discount,
            image,
            description,
        });
    }

    return (
        <Table.Row>
            <Img src={image} />
            <Cabin>{name}</Cabin>
            <div>Fits up to {maxCapacity} guests</div>
            <Price>{formatCurrency(regularPrice)}</Price>
            {discount ? (
                <Discount>{formatCurrency(discount)}</Discount>
            ) : (
                <span>&mdash;</span>
            )}
            <div>
                <Modal>
                    <Menus.Menu>
                        <Menus.Toggle id={cabinId} />

                        <Menus.List id={cabinId}>
                            <Menus.Button
                                icon={<HiSquare2Stack />}
                                onClick={handleDuplicate}
                                isCreating={isCreating}
                            >
                                Duplicate
                            </Menus.Button>

                            <Modal.Open
                                renderOpen={(open) => (
                                    <Menus.Button
                                        icon={<HiPencil />}
                                        onClick={() => open("edit")}
                                    >
                                        Edit
                                    </Menus.Button>
                                )}
                            ></Modal.Open>

                            <Modal.Open
                                renderOpen={(open) => (
                                    <Menus.Button
                                        icon={<HiTrash />}
                                        onClick={() => open("delete")}
                                    >
                                        Delete
                                    </Menus.Button>
                                )}
                            />
                        </Menus.List>

                        <Modal.Window
                            name="edit"
                            render={(close) => (
                                <CreateCabinForm
                                    cabinToEdit={cabin}
                                    onCloseModal={close}
                                />
                            )}
                        ></Modal.Window>
                        <Modal.Window
                            name="delete"
                            render={(close) => (
                                <ConfirmDelete
                                    onConfirm={() => {
                                        deleteCabin(cabinId);
                                    }}
                                    disabled={isDeleting}
                                    resourceName={"cabin"}
                                    onCloseModal={close}
                                />
                            )}
                        />
                    </Menus.Menu>
                </Modal>
            </div>
        </Table.Row>
    );
}

export default CabinRow;
