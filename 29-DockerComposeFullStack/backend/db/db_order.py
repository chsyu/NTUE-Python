from fastapi import HTTPException, status
from sqlalchemy.orm.session import Session
from sqlalchemy import func, exc
from sqlalchemy.exc import IntegrityError
from router.schemas import CreateOrderRequestSchema
from db.models import DbOrder, DbOrderItems
import uuid


def create(db: Session, request:CreateOrderRequestSchema):
    id = uuid.uuid4()
    try:
        new_order = DbOrder(
            id=str(id),
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
            qty=item.qty,
            category=item.category,
            name=item.name,
            image=item.image,
            price=item.price,
            countInStock=item.countInStock
        ) for item in request.orderItems]
        db.add_all(order_items)
        db.commit()
        order = db.query(DbOrder).filter(
            DbOrder.id == order_id).first()

        order_items = db.query(DbOrderItems).filter(
            DbOrderItems.order_id == order_id).all()

        return {
            "id": order.id,
            "orderItems": order_items,
            "shippingAddress": {
                "fullName": order.full_name,
                "address": order.address,
                "city": order.city,
                "postalCode": order.postal_code,
                "country": order.country
            },
            "fullName": order.full_name,
            "paymentMethod": order.payment_method,
            "itemsPrice": order.items_price,
            "shippingPrice": order.shipping_price,
            "taxPrice": order.tax_price,
            "totalPrice": order.items_price + order.shipping_price + order.tax_price,
        }

    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"{exc}".split('\n')[0])


def get_order_by_id(order_id: str, db: Session):
    order = db.query(DbOrder).filter(
        DbOrder.id == order_id).first()

    order_items = db.query(DbOrderItems).filter(
        DbOrderItems.order_id == order_id).all()
    # if not order or not order_items:
    #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail=f'order with id = {order_id} not found')
    return {
        "id": order.id,
        "orderItems": order_items,
        "shippingAddress": {
            "fullName": order.full_name,
            "address": order.address,
            "city": order.city,
            "postalCode": order.postal_code,
            "country": order.country
        },
        "fullName": order.full_name,
        "paymentMethod": order.payment_method,
        "itemsPrice": order.items_price,
        "shippingPrice": order.shipping_price,
        "taxPrice": order.tax_price,
        "totalPrice": order.items_price + order.shipping_price + order.tax_price,
    }


