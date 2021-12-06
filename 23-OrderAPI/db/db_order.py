from fastapi import HTTPException, status
from sqlalchemy.orm.session import Session
from sqlalchemy import func, exc
from sqlalchemy.exc import IntegrityError
from router.schemas import CreateOrderRequestSchema
from db.models import DbOrder, DbOrderItems


def create(db: Session, request:CreateOrderRequestSchema):
    try:
        new_order = DbOrder(
            username=request.username,
            full_name=request.shippingAddress.fullName,
            address=request.shippingAddress.address,
            city=request.shippingAddress.city,
            postal_code=request.shippingAddress.postalCode,
            country=request.shippingAddress.country,
            payment_method=request.paymentMethod,
            items_price=request.itemsPrice,
            shipping_price=request.shippingPrice,
            tax_price=request.taxPrice,
            owner_id=request.user_id
        )
        db.add(new_order)
        db.commit()
        db.refresh(new_order)
        order_id = new_order.id
        #
        order_items = [DbOrderItems(
            order_id=order_id,
            product_id=item.id,
            quantity=item.qty
        ) for item in request.orderItems]
        db.add_all(order_items)
        db.commit()

        return {
            'id': order_id
        }

    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"{exc}".split('\n')[0])
