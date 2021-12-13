import React, { Component } from "react";
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
    content: {
        top: '20%',
        left: '20%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-20%',
        transform: 'translate(-20%, -20%)',
        width: '1000px',
        height: '550px'

    },
};

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            modalItem: null,
            review:'',
            reviewType:'',
            products: [
                {
                    id: 1,
                    name: 'Holiday Nuts Gift Basket',
                    img: 'https://user-images.githubusercontent.com/89652977/144945648-5fe2c761-68f3-43cc-9abe-8998c5973fa4.png',
                    reviews: [
                        { type: 0, reviewid: 200, review: "First things first, when I opened the box, all of the fruit was in an open bag...so it ALL fell out into the packaging box. Then, when I tasted a few bits, they were all hard and tasteless (except for the plastic/cardboard after taste)" },
                        { type: 0, reviewid: 201, review: "If you're even halfway interested in buying dried fruit, do not hesitate to buy this brand! Incredible assortment and everything was so fresh. I purchased for a party I was hosting and everybody loved it. Would definitely reorder." },
                        { type: 0, reviewid: 202, review: "As someone who is both gluten free and allergic to artificial colors I was unable to use these 2 pounds of fruit that I ordered and there was a no return policy. Call me old fashioned, but I think dried fruit shouldn't contain anything else" }]
                },
                {
                    id: 2,
                    name: 'Golden Raisins, Seedless Dry Grapes',
                    img: 'https://user-images.githubusercontent.com/89652977/144945687-23b718d3-5205-403e-b6db-6ae242c3481b.png',
                    reviews: [
                        { type: 1, reviewid: 300, review: "I bought one and liked it so well I bought 4 more as gifts. Delicious. Excellent product" },
                        { type: 0, reviewid: 301, review: "Extremely disappointed, bought this as a gift to myself for breastfeeding so well, and was most excited about the dried hibiscus. I couldn’t enjoy hibiscus while pregnant and have been craving it like wild. It’s the only fruit NOT included but there is plenty of indications that it should be here. Also while the hibiscus is missing there is a ‘mystery fruit’ that replaced it, I’m assuming it’s star fruit considering it’s shape but that’s only my guess. Not impressed with swapping out of the hibiscus for star fruit with no warning and no general info on the new fruit. Considering it was a gift to myself I’m beyond disappointed and will consider using other brands the next time I order my fruit." },
                        { type: 1, reviewid: 302, review: "I ordered this for delivery to my quarantined family in Arizona. They live too far out to be able to shop frequently and hadn't had fruit for several weeks when this arrived. They were ecstatic and said it was delicious! The assortment was right up their alley and they used the fruits for snacks as well as additions to cooked dishes. Thank you for a great product!" }]
                },
                {
                    id: 3,
                    name: 'A Gift Inside Bloom Dried Fruit Deluxe',
                    img: 'https://user-images.githubusercontent.com/89652977/144945750-33ce8a65-c11a-4576-a47d-040ba804a128.png',
                    reviews: [
                        { type: 1, reviewid: 400, review: "After sending this as a gift to 2 people, and not knowing exctly what it looks like, i ordered one for myself. Wrapped and presented EXACTLY as in picture.. and LOADS and LOADS of fruit.. after eating it non-stop for a weekend, i still had a ton left and gave to a neighbor.. will definitely send as a gift again.." },
                        { type: 0, reviewid: 401, review: "Dried fruit looks great, but smelled terrible. Then there was the flavor, just like that terrible chemical smell. Not sure if this is even safe for human beings to ingest whatever that chemical smell is Get a different one, there are plenty of better ones here" },
                        { type: 0, reviewid: 402, review: "I initially bought this as a gift for my boyfriend’s family, but the presentation is nowhere near as nice as in the picture. It arrived looking very smooshed and dull, so I kept it for myself and will be finding something nicer for them. After tasting, I can tell you that the flavor of everything is pretty bland. It tastes old. I wish the product was fresher and I wish it had been packed with more care." }]
                },
                {
                    id: 4,
                    name: 'Chocolate Gift Basket, Holiday Food Tray',
                    img: 'https://user-images.githubusercontent.com/89652977/144945915-9e102b1a-812a-4a45-bb66-3116a7b34b73.png',
                    reviews: [
                        { type: 0, reviewid: 500, review: "I ordered 2 boxes on the same day. One for my wife, one for my mom. Took two weeks to arrive at separate addresses in 2 Oklahoma towns. Mom's was melted" },
                        { type: 0, reviewid: 501, review: "I did not like this product. Having lived in Belgium and tried a LOT of European chocolate I can tell you this is OVERPRICED, the picture is misleading since it looks like a lot of chocolates come in the box, but it is a very small box. Also, the chocolates themselves are not great tasting and their fillings are not all good. I would recommend to look for other options if you really want a chocolate box, I am sure you can find a better one." },
                        { type: 1, reviewid: 502, review: "I sent this to my 93 y/o mother-in-law and my sister-in-law, who has been caring for her, as a pick me up. They have been holed up in a NY apartment for a year together. The daily reports of who was eating more and who was sneaking what was hilarious. They both got their vaccines this past month so maybe things will ease up for them, but this provided a nice diversion for the final weeks of self imposed quarantine/ incarnation for them." }]
                },
                {
                    id: 5,
                    name: 'Godiva Chocolatier Chocolate Gold Gift Box',
                    img: 'https://user-images.githubusercontent.com/89652977/144945940-bf884c32-920e-4764-81a8-0f5c3b258388.png',
                    reviews: [
                        { type: 0, reviewid: 600, review: "These were for my wife’s birthday. After visiting Switzerland last October, Lindt chocolates became her favorite. These arrived melted, obviously old, the chocolates had turned color and had a crust on them. Never buying from this vendor again, poor quality control and selling outdated product." },
                        { type: 1, reviewid: 601, review: "Very tasty chocolate, they where packaged and delivered amazingly. When I opened the chocolate some of the chocolates where turned upside down but I just flipped them over and they where I undamaged and visually appealing. I got them delivered at low 70 degrees in California, so they look to survive that without melting." },
                        { type: 1, reviewid: 602, review: "This is my favorite box to send as a gift. I normally buy it directly from Lindt but it was cheaper at Amazon. (Not anymore, the price just increased ridiculously). Lindt, you should know better. Amazon!! You should know better. One teeny, tiny ice pack that was completely thawed and this is what my friend received as gift?! So disappointed. I’d blame FedEx but they did their job. It should have been packed and prepped much better." }]
                },
                {
                    id: 6,
                    name: 'Godiva Chocolatier Gift Box, Milk Chocolate',
                    img: 'https://user-images.githubusercontent.com/89652977/144945983-2e0ac0fd-1ab6-4c83-be42-ea866247a37c.png',
                    reviews: [
                        { type: 1, reviewid: 700, review: "Godiva chocolates are a heaven-sent gift from God! As I pop the chocolate into my mouth, my eyes close, my head tilts back, and my spirit is carried away into a state of euphoria! One chocolate is never enough! Godiva tastes even better when shared with that special someone! Nice packaging makes it classy for giving, and once opened, the room will resound in a rhapsody of “Ahhhh!”" },
                        { type: 1, reviewid: 701, review: "My husband bought these for me for Valentine's Day. They arrived on time and the chocolates were all delicious." },
                        { type: 1, reviewid: 702, review: "This was a birthday gift for my candy-loving step-father. He REALLY likes them but is pacing himself through the box. :))" }]
                },
            ]
        }
    }
    componentWillMount() {
        Modal.setAppElement('body');
       
    }
    openModal(item){
        console.log(item)
        this.setState({
            modalIsOpen: true,
            modalItem: item
        },()=>{
           console.log(item)
        })
    }
    reviewSubmitted = () =>{
        axios.get('http://127.0.0.1:5000/getreviewtype',{ params: { name: this.state.review } })
        .then(res => {
            this.setState({
                reviewType: res.data
            })
        },()=>{
            setTimeout(()=>{
                this.setState({

                })
            })
        })
    }
    reviewChanged = (e) =>{
        this.setState({
            review: e.target.value
        })
    }
    closeModal = () => {
        this.setState({
            modalIsOpen: false
        })
    }
    render() {
        return (
            <div className="product-wrapper">
                {this.state.products.map((item, index) => {
                    return (
                        <div className="card" key={index}>
                            <div className="card-image">
                                <figure className="image is-4by3">
                                    <img src={item.img} alt="Placeholder image"></img>
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="content">
                                    <strong> {item.name}</strong>
                                    <br></br>
                                </div>
                                <div className="more-details">
                                    <button className="details-button" onClick={this.openModal.bind(this,item)}>
                                        <strong>More Details</strong>
                                    </button>
                                </div>
                                <Modal
                                    isOpen={this.state.modalIsOpen}
                                    onRequestClose={this.closeModal}
                                    style={customStyles}
                                    contentLabel="Example Modal"
                                >
                                    <div className="card">
                                        <div className="card-image">
                                            <figure className="image is-4by3">
                                                <img src={this.state.modalItem?.img} alt="Placeholder image"></img>
                                            </figure>
                                        </div>
                                        <div className="card-content">
                                            <div className="content">
                                                <strong> {this.state.modalItem?.name}</strong>
                                                <br></br>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>Submit your review for this product</div>
                                        <input className="input-review" type="text" value={this.state.value} onChange={this.reviewChanged}></input>
                                        <button className="review-submit" onClick={this.reviewSubmitted}>Submit</button>
                                    </div>
                                    <h3>{this.state.reviewType}</h3>
                                </Modal>
                            </div>
                        </div>
                    )
                })
                }
            </div>
        );
    }
}

export default Product;

