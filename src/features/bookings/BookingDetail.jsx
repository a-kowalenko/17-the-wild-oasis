import styled from "styled-components";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import BookingDataBox from "./BookingDataBox";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const navigate = useNavigate();
    const { booking, isLoading } = useBooking();
    const { checkout, isCheckingOut } = useCheckout();
    const { deleteBooking, isDeletingBooking } = useDeleteBooking();
    const moveBack = useMoveBack();

    if (isLoading) {
        return <Spinner />;
    }

    if (!booking) {
        return <Empty resourceName="booking" />;
    }

    const { status, id: bookingId } = booking;

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{bookingId}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status.replace("-", " ")}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />
            <Modal>
                <ButtonGroup>
                    {status === "unconfirmed" && (
                        <Button
                            onClick={() => navigate(`/checkin/${bookingId}`)}
                        >
                            Check-in
                        </Button>
                    )}

                    <Modal.Open
                        renderOpen={(open) => (
                            <Button
                                onClick={() => open("deleteBooking")}
                                $variation="danger"
                                disabled={isDeletingBooking}
                            >
                                Delete booking
                            </Button>
                        )}
                    />

                    {status === "checked-in" && (
                        <Button
                            onClick={() => checkout(bookingId)}
                            disabled={isCheckingOut}
                        >
                            Check-out
                        </Button>
                    )}

                    <Button $variation="secondary" onClick={moveBack}>
                        Back
                    </Button>
                </ButtonGroup>
                <Modal.Window
                    name="deleteBooking"
                    render={(close) => (
                        <ConfirmDelete
                            onConfirm={() => {
                                deleteBooking(bookingId, {
                                    onSuccess: () => navigate("/bookings"),
                                });
                            }}
                            disabled={isDeletingBooking}
                            resourceName={"booking"}
                            onCloseModal={close}
                        />
                    )}
                ></Modal.Window>
            </Modal>
        </>
    );
}

export default BookingDetail;
