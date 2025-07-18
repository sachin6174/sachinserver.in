import React, { useState, useCallback } from 'react';
import './EmojiPicker.css';

const EmojiPicker = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showUnicode, setShowUnicode] = useState(true);
    const [copiedEmoji, setCopiedEmoji] = useState(null);
    const [unicodeInput, setUnicodeInput] = useState('');
    const [convertedEmoji, setConvertedEmoji] = useState('');
    const [unicodeError, setUnicodeError] = useState('');

    // Comprehensive emoji database organized by categories
    const emojiDatabase = {
        faces: {
            name: 'Faces & Emotions',
            icon: '😀',
            emojis: [
                { emoji: '😀', name: 'Grinning Face', unicode: 'U+1F600' },
                { emoji: '😃', name: 'Grinning Face with Big Eyes', unicode: 'U+1F603' },
                { emoji: '😄', name: 'Grinning Face with Smiling Eyes', unicode: 'U+1F604' },
                { emoji: '😁', name: 'Beaming Face with Smiling Eyes', unicode: 'U+1F601' },
                { emoji: '😆', name: 'Grinning Squinting Face', unicode: 'U+1F606' },
                { emoji: '😅', name: 'Grinning Face with Sweat', unicode: 'U+1F605' },
                { emoji: '🤣', name: 'Rolling on Floor Laughing', unicode: 'U+1F923' },
                { emoji: '😂', name: 'Face with Tears of Joy', unicode: 'U+1F602' },
                { emoji: '🙂', name: 'Slightly Smiling Face', unicode: 'U+1F642' },
                { emoji: '🙃', name: 'Upside-Down Face', unicode: 'U+1F643' },
                { emoji: '😉', name: 'Winking Face', unicode: 'U+1F609' },
                { emoji: '😊', name: 'Smiling Face with Smiling Eyes', unicode: 'U+1F60A' },
                { emoji: '😇', name: 'Smiling Face with Halo', unicode: 'U+1F607' },
                { emoji: '🥰', name: 'Smiling Face with Hearts', unicode: 'U+1F970' },
                { emoji: '😍', name: 'Smiling Face with Heart-Eyes', unicode: 'U+1F60D' },
                { emoji: '🤩', name: 'Star-Struck', unicode: 'U+1F929' },
                { emoji: '😘', name: 'Face Blowing a Kiss', unicode: 'U+1F618' },
                { emoji: '😗', name: 'Kissing Face', unicode: 'U+1F617' },
                { emoji: '😚', name: 'Kissing Face with Closed Eyes', unicode: 'U+1F61A' },
                { emoji: '😙', name: 'Kissing Face with Smiling Eyes', unicode: 'U+1F619' },
                { emoji: '😋', name: 'Face Savoring Food', unicode: 'U+1F60B' },
                { emoji: '😛', name: 'Face with Tongue', unicode: 'U+1F61B' },
                { emoji: '😜', name: 'Winking Face with Tongue', unicode: 'U+1F61C' },
                { emoji: '🤪', name: 'Zany Face', unicode: 'U+1F929' },
                { emoji: '😝', name: 'Squinting Face with Tongue', unicode: 'U+1F61D' },
                { emoji: '🤑', name: 'Money-Mouth Face', unicode: 'U+1F911' },
                { emoji: '🤗', name: 'Hugging Face', unicode: 'U+1F917' },
                { emoji: '🤭', name: 'Face with Hand Over Mouth', unicode: 'U+1F92D' },
                { emoji: '🤫', name: 'Shushing Face', unicode: 'U+1F92B' },
                { emoji: '🤔', name: 'Thinking Face', unicode: 'U+1F914' },
                { emoji: '🤐', name: 'Zipper-Mouth Face', unicode: 'U+1F910' },
                { emoji: '🤨', name: 'Face with Raised Eyebrow', unicode: 'U+1F928' },
                { emoji: '😐', name: 'Neutral Face', unicode: 'U+1F610' },
                { emoji: '😑', name: 'Expressionless Face', unicode: 'U+1F611' },
                { emoji: '😶', name: 'Face Without Mouth', unicode: 'U+1F636' },
                { emoji: '😏', name: 'Smirking Face', unicode: 'U+1F60F' },
                { emoji: '😒', name: 'Unamused Face', unicode: 'U+1F612' },
                { emoji: '🙄', name: 'Face with Rolling Eyes', unicode: 'U+1F644' },
                { emoji: '😬', name: 'Grimacing Face', unicode: 'U+1F62C' },
                { emoji: '🤥', name: 'Lying Face', unicode: 'U+1F925' },
                { emoji: '😔', name: 'Pensive Face', unicode: 'U+1F614' },
                { emoji: '😪', name: 'Sleepy Face', unicode: 'U+1F62A' },
                { emoji: '🤤', name: 'Drooling Face', unicode: 'U+1F924' },
                { emoji: '😴', name: 'Sleeping Face', unicode: 'U+1F634' },
                { emoji: '😷', name: 'Face with Medical Mask', unicode: 'U+1F637' },
                { emoji: '🤒', name: 'Face with Thermometer', unicode: 'U+1F912' },
                { emoji: '🤕', name: 'Face with Head-Bandage', unicode: 'U+1F915' },
                { emoji: '🤢', name: 'Nauseated Face', unicode: 'U+1F922' },
                { emoji: '🤮', name: 'Face Vomiting', unicode: 'U+1F92E' },
                { emoji: '🤧', name: 'Sneezing Face', unicode: 'U+1F927' },
                { emoji: '🥵', name: 'Hot Face', unicode: 'U+1F975' },
                { emoji: '🥶', name: 'Cold Face', unicode: 'U+1F976' },
                { emoji: '🥴', name: 'Woozy Face', unicode: 'U+1F974' },
                { emoji: '😵', name: 'Dizzy Face', unicode: 'U+1F635' },
                { emoji: '🤯', name: 'Exploding Head', unicode: 'U+1F92F' },
                { emoji: '😎', name: 'Smiling Face with Sunglasses', unicode: 'U+1F60E' },
                { emoji: '🤓', name: 'Nerd Face', unicode: 'U+1F913' },
                { emoji: '🧐', name: 'Face with Monocle', unicode: 'U+1F9D0' },
                { emoji: '😕', name: 'Confused Face', unicode: 'U+1F615' },
                { emoji: '😟', name: 'Worried Face', unicode: 'U+1F61F' },
                { emoji: '🙁', name: 'Slightly Frowning Face', unicode: 'U+1F641' },
                { emoji: '☹️', name: 'Frowning Face', unicode: 'U+2639' },
                { emoji: '😮', name: 'Face with Open Mouth', unicode: 'U+1F62E' },
                { emoji: '😯', name: 'Hushed Face', unicode: 'U+1F62F' },
                { emoji: '😲', name: 'Astonished Face', unicode: 'U+1F632' },
                { emoji: '😳', name: 'Flushed Face', unicode: 'U+1F633' },
                { emoji: '🥺', name: 'Pleading Face', unicode: 'U+1F97A' },
                { emoji: '😦', name: 'Frowning Face with Open Mouth', unicode: 'U+1F626' },
                { emoji: '😧', name: 'Anguished Face', unicode: 'U+1F627' },
                { emoji: '😨', name: 'Fearful Face', unicode: 'U+1F628' },
                { emoji: '😰', name: 'Anxious Face with Sweat', unicode: 'U+1F630' },
                { emoji: '😥', name: 'Sad but Relieved Face', unicode: 'U+1F625' },
                { emoji: '😢', name: 'Crying Face', unicode: 'U+1F622' },
                { emoji: '😭', name: 'Loudly Crying Face', unicode: 'U+1F62D' },
                { emoji: '😱', name: 'Face Screaming in Fear', unicode: 'U+1F631' },
                { emoji: '😖', name: 'Confounded Face', unicode: 'U+1F616' },
                { emoji: '😣', name: 'Persevering Face', unicode: 'U+1F623' },
                { emoji: '😞', name: 'Disappointed Face', unicode: 'U+1F61E' },
                { emoji: '😓', name: 'Downcast Face with Sweat', unicode: 'U+1F613' },
                { emoji: '😩', name: 'Weary Face', unicode: 'U+1F629' },
                { emoji: '😫', name: 'Tired Face', unicode: 'U+1F62B' },
                { emoji: '😤', name: 'Face with Steam From Nose', unicode: 'U+1F624' },
                { emoji: '😡', name: 'Pouting Face', unicode: 'U+1F621' },
                { emoji: '😠', name: 'Angry Face', unicode: 'U+1F620' },
                { emoji: '🤬', name: 'Face with Symbols on Mouth', unicode: 'U+1F92C' },
                { emoji: '😈', name: 'Smiling Face with Horns', unicode: 'U+1F608' },
                { emoji: '👿', name: 'Angry Face with Horns', unicode: 'U+1F47F' },
                { emoji: '💀', name: 'Skull', unicode: 'U+1F480' },
                { emoji: '☠️', name: 'Skull and Crossbones', unicode: 'U+2620' }
            ]
        },
        animals: {
            name: 'Animals & Nature',
            icon: '🐶',
            emojis: [
                { emoji: '🐶', name: 'Dog Face', unicode: 'U+1F436' },
                { emoji: '🐱', name: 'Cat Face', unicode: 'U+1F431' },
                { emoji: '🐭', name: 'Mouse Face', unicode: 'U+1F42D' },
                { emoji: '🐹', name: 'Hamster Face', unicode: 'U+1F439' },
                { emoji: '🐰', name: 'Rabbit Face', unicode: 'U+1F430' },
                { emoji: '🦊', name: 'Fox Face', unicode: 'U+1F98A' },
                { emoji: '🐻', name: 'Bear Face', unicode: 'U+1F43B' },
                { emoji: '🐼', name: 'Panda Face', unicode: 'U+1F43C' },
                { emoji: '🐨', name: 'Koala', unicode: 'U+1F428' },
                { emoji: '🐯', name: 'Tiger Face', unicode: 'U+1F42F' },
                { emoji: '🦁', name: 'Lion Face', unicode: 'U+1F981' },
                { emoji: '🐮', name: 'Cow Face', unicode: 'U+1F42E' },
                { emoji: '🐷', name: 'Pig Face', unicode: 'U+1F437' },
                { emoji: '🐸', name: 'Frog Face', unicode: 'U+1F438' },
                { emoji: '🐵', name: 'Monkey Face', unicode: 'U+1F435' },
                { emoji: '🙈', name: 'See-No-Evil Monkey', unicode: 'U+1F648' },
                { emoji: '🙉', name: 'Hear-No-Evil Monkey', unicode: 'U+1F649' },
                { emoji: '🙊', name: 'Speak-No-Evil Monkey', unicode: 'U+1F64A' },
                { emoji: '🐒', name: 'Monkey', unicode: 'U+1F412' },
                { emoji: '🐔', name: 'Chicken', unicode: 'U+1F414' },
                { emoji: '🐧', name: 'Penguin', unicode: 'U+1F427' },
                { emoji: '🐦', name: 'Bird', unicode: 'U+1F426' },
                { emoji: '🐤', name: 'Baby Chick', unicode: 'U+1F424' },
                { emoji: '🐣', name: 'Hatching Chick', unicode: 'U+1F423' },
                { emoji: '🐥', name: 'Front-Facing Baby Chick', unicode: 'U+1F425' },
                { emoji: '🦆', name: 'Duck', unicode: 'U+1F986' },
                { emoji: '🦅', name: 'Eagle', unicode: 'U+1F985' },
                { emoji: '🦉', name: 'Owl', unicode: 'U+1F989' },
                { emoji: '🦇', name: 'Bat', unicode: 'U+1F987' },
                { emoji: '🐺', name: 'Wolf Face', unicode: 'U+1F43A' },
                { emoji: '🐗', name: 'Boar', unicode: 'U+1F417' },
                { emoji: '🐴', name: 'Horse Face', unicode: 'U+1F434' },
                { emoji: '🦄', name: 'Unicorn Face', unicode: 'U+1F984' },
                { emoji: '🐝', name: 'Honeybee', unicode: 'U+1F41D' },
                { emoji: '🐛', name: 'Bug', unicode: 'U+1F41B' },
                { emoji: '🦋', name: 'Butterfly', unicode: 'U+1F98B' },
                { emoji: '🐌', name: 'Snail', unicode: 'U+1F40C' },
                { emoji: '🐞', name: 'Lady Beetle', unicode: 'U+1F41E' },
                { emoji: '🐜', name: 'Ant', unicode: 'U+1F41C' },
                { emoji: '🦗', name: 'Cricket', unicode: 'U+1F997' },
                { emoji: '🕷️', name: 'Spider', unicode: 'U+1F577' },
                { emoji: '🦂', name: 'Scorpion', unicode: 'U+1F982' },
                { emoji: '🐢', name: 'Turtle', unicode: 'U+1F422' },
                { emoji: '🐍', name: 'Snake', unicode: 'U+1F40D' },
                { emoji: '🦎', name: 'Lizard', unicode: 'U+1F98E' },
                { emoji: '🐙', name: 'Octopus', unicode: 'U+1F419' },
                { emoji: '🦑', name: 'Squid', unicode: 'U+1F991' },
                { emoji: '🦐', name: 'Shrimp', unicode: 'U+1F990' },
                { emoji: '🦀', name: 'Crab', unicode: 'U+1F980' },
                { emoji: '🐡', name: 'Blowfish', unicode: 'U+1F421' },
                { emoji: '🐠', name: 'Tropical Fish', unicode: 'U+1F420' },
                { emoji: '🐟', name: 'Fish', unicode: 'U+1F41F' },
                { emoji: '🐬', name: 'Dolphin', unicode: 'U+1F42C' },
                { emoji: '🐳', name: 'Spouting Whale', unicode: 'U+1F433' },
                { emoji: '🐋', name: 'Whale', unicode: 'U+1F40B' },
                { emoji: '🦈', name: 'Shark', unicode: 'U+1F988' },
                { emoji: '🌵', name: 'Cactus', unicode: 'U+1F335' },
                { emoji: '🎄', name: 'Christmas Tree', unicode: 'U+1F384' },
                { emoji: '🌲', name: 'Evergreen Tree', unicode: 'U+1F332' },
                { emoji: '🌳', name: 'Deciduous Tree', unicode: 'U+1F333' },
                { emoji: '🌴', name: 'Palm Tree', unicode: 'U+1F334' },
                { emoji: '🌱', name: 'Seedling', unicode: 'U+1F331' },
                { emoji: '🌿', name: 'Herb', unicode: 'U+1F33F' },
                { emoji: '🍀', name: 'Four Leaf Clover', unicode: 'U+1F340' },
                { emoji: '🌹', name: 'Rose', unicode: 'U+1F339' },
                { emoji: '🌺', name: 'Hibiscus', unicode: 'U+1F33A' },
                { emoji: '🌻', name: 'Sunflower', unicode: 'U+1F33B' },
                { emoji: '🌸', name: 'Cherry Blossom', unicode: 'U+1F338' }
            ]
        },
        food: {
            name: 'Food & Drink',
            icon: '🍕',
            emojis: [
                { emoji: '🍏', name: 'Green Apple', unicode: 'U+1F34F' },
                { emoji: '🍎', name: 'Red Apple', unicode: 'U+1F34E' },
                { emoji: '🍊', name: 'Tangerine', unicode: 'U+1F34A' },
                { emoji: '🍋', name: 'Lemon', unicode: 'U+1F34B' },
                { emoji: '🍌', name: 'Banana', unicode: 'U+1F34C' },
                { emoji: '🍉', name: 'Watermelon', unicode: 'U+1F349' },
                { emoji: '🍇', name: 'Grapes', unicode: 'U+1F347' },
                { emoji: '🍓', name: 'Strawberry', unicode: 'U+1F353' },
                { emoji: '🍑', name: 'Peach', unicode: 'U+1F351' },
                { emoji: '🍍', name: 'Pineapple', unicode: 'U+1F34D' },
                { emoji: '🥝', name: 'Kiwi Fruit', unicode: 'U+1F95D' },
                { emoji: '🍅', name: 'Tomato', unicode: 'U+1F345' },
                { emoji: '🥑', name: 'Avocado', unicode: 'U+1F951' },
                { emoji: '🥒', name: 'Cucumber', unicode: 'U+1F952' },
                { emoji: '🌽', name: 'Ear of Corn', unicode: 'U+1F33D' },
                { emoji: '🥕', name: 'Carrot', unicode: 'U+1F955' },
                { emoji: '🥔', name: 'Potato', unicode: 'U+1F954' },
                { emoji: '🍞', name: 'Bread', unicode: 'U+1F35E' },
                { emoji: '🧀', name: 'Cheese Wedge', unicode: 'U+1F9C0' },
                { emoji: '🥚', name: 'Egg', unicode: 'U+1F95A' },
                { emoji: '🍳', name: 'Cooking', unicode: 'U+1F373' },
                { emoji: '🥞', name: 'Pancakes', unicode: 'U+1F95E' },
                { emoji: '🥓', name: 'Bacon', unicode: 'U+1F953' },
                { emoji: '🍗', name: 'Poultry Leg', unicode: 'U+1F357' },
                { emoji: '🍖', name: 'Meat on Bone', unicode: 'U+1F356' },
                { emoji: '🌭', name: 'Hot Dog', unicode: 'U+1F32D' },
                { emoji: '🍔', name: 'Hamburger', unicode: 'U+1F354' },
                { emoji: '🍟', name: 'French Fries', unicode: 'U+1F35F' },
                { emoji: '🍕', name: 'Pizza', unicode: 'U+1F355' },
                { emoji: '🥪', name: 'Sandwich', unicode: 'U+1F96A' },
                { emoji: '🌮', name: 'Taco', unicode: 'U+1F32E' },
                { emoji: '🌯', name: 'Burrito', unicode: 'U+1F32F' },
                { emoji: '🥗', name: 'Green Salad', unicode: 'U+1F957' },
                { emoji: '🍝', name: 'Spaghetti', unicode: 'U+1F35D' },
                { emoji: '🍜', name: 'Steaming Bowl', unicode: 'U+1F35C' },
                { emoji: '🍲', name: 'Pot of Food', unicode: 'U+1F372' },
                { emoji: '🍛', name: 'Curry Rice', unicode: 'U+1F35B' },
                { emoji: '🍣', name: 'Sushi', unicode: 'U+1F363' },
                { emoji: '🍱', name: 'Bento Box', unicode: 'U+1F371' },
                { emoji: '🥟', name: 'Dumpling', unicode: 'U+1F95F' },
                { emoji: '🍤', name: 'Fried Shrimp', unicode: 'U+1F364' },
                { emoji: '🍙', name: 'Rice Ball', unicode: 'U+1F359' },
                { emoji: '🍚', name: 'Cooked Rice', unicode: 'U+1F35A' },
                { emoji: '🍧', name: 'Shaved Ice', unicode: 'U+1F367' },
                { emoji: '🍨', name: 'Ice Cream', unicode: 'U+1F368' },
                { emoji: '🍦', name: 'Soft Ice Cream', unicode: 'U+1F366' },
                { emoji: '🥧', name: 'Pie', unicode: 'U+1F967' },
                { emoji: '🍰', name: 'Shortcake', unicode: 'U+1F370' },
                { emoji: '🎂', name: 'Birthday Cake', unicode: 'U+1F382' },
                { emoji: '🍮', name: 'Custard', unicode: 'U+1F36E' },
                { emoji: '🍭', name: 'Lollipop', unicode: 'U+1F36D' },
                { emoji: '🍬', name: 'Candy', unicode: 'U+1F36C' },
                { emoji: '🍫', name: 'Chocolate Bar', unicode: 'U+1F36B' },
                { emoji: '🍿', name: 'Popcorn', unicode: 'U+1F37F' },
                { emoji: '🍩', name: 'Doughnut', unicode: 'U+1F369' },
                { emoji: '🍪', name: 'Cookie', unicode: 'U+1F36A' },
                { emoji: '🍯', name: 'Honey Pot', unicode: 'U+1F36F' },
                { emoji: '🥛', name: 'Glass of Milk', unicode: 'U+1F95B' },
                { emoji: '☕', name: 'Hot Beverage', unicode: 'U+2615' },
                { emoji: '🍵', name: 'Teacup Without Handle', unicode: 'U+1F375' },
                { emoji: '🍶', name: 'Sake', unicode: 'U+1F376' },
                { emoji: '🍷', name: 'Wine Glass', unicode: 'U+1F377' },
                { emoji: '🍸', name: 'Cocktail Glass', unicode: 'U+1F378' },
                { emoji: '🍹', name: 'Tropical Drink', unicode: 'U+1F379' },
                { emoji: '🍺', name: 'Beer Mug', unicode: 'U+1F37A' },
                { emoji: '🍻', name: 'Clinking Beer Mugs', unicode: 'U+1F37B' },
                { emoji: '🥂', name: 'Clinking Glasses', unicode: 'U+1F942' },
                { emoji: '🥃', name: 'Tumbler Glass', unicode: 'U+1F943' },
                { emoji: '🥤', name: 'Cup with Straw', unicode: 'U+1F964' }
            ]
        },
        travel: {
            name: 'Travel & Places',
            icon: '✈️',
            emojis: [
                { emoji: '🚗', name: 'Automobile', unicode: 'U+1F697' },
                { emoji: '🚕', name: 'Taxi', unicode: 'U+1F695' },
                { emoji: '🚙', name: 'Sport Utility Vehicle', unicode: 'U+1F699' },
                { emoji: '🚌', name: 'Bus', unicode: 'U+1F68C' },
                { emoji: '🚎', name: 'Trolleybus', unicode: 'U+1F68E' },
                { emoji: '🚓', name: 'Police Car', unicode: 'U+1F693' },
                { emoji: '🚑', name: 'Ambulance', unicode: 'U+1F691' },
                { emoji: '🚒', name: 'Fire Engine', unicode: 'U+1F692' },
                { emoji: '🚐', name: 'Minibus', unicode: 'U+1F690' },
                { emoji: '🚚', name: 'Delivery Truck', unicode: 'U+1F69A' },
                { emoji: '🚛', name: 'Articulated Lorry', unicode: 'U+1F69B' },
                { emoji: '🚜', name: 'Tractor', unicode: 'U+1F69C' },
                { emoji: '🚲', name: 'Bicycle', unicode: 'U+1F6B2' },
                { emoji: '🚁', name: 'Helicopter', unicode: 'U+1F681' },
                { emoji: '✈️', name: 'Airplane', unicode: 'U+2708' },
                { emoji: '🚀', name: 'Rocket', unicode: 'U+1F680' },
                { emoji: '🛸', name: 'Flying Saucer', unicode: 'U+1F6F8' },
                { emoji: '🚉', name: 'Station', unicode: 'U+1F689' },
                { emoji: '🚄', name: 'High-Speed Train', unicode: 'U+1F684' },
                { emoji: '🚅', name: 'Bullet Train', unicode: 'U+1F685' },
                { emoji: '🚈', name: 'Light Rail', unicode: 'U+1F688' },
                { emoji: '🚂', name: 'Locomotive', unicode: 'U+1F682' },
                { emoji: '🚆', name: 'Train', unicode: 'U+1F686' },
                { emoji: '🚇', name: 'Metro', unicode: 'U+1F687' },
                { emoji: '🚊', name: 'Tram', unicode: 'U+1F68A' },
                { emoji: '⛵', name: 'Sailboat', unicode: 'U+26F5' },
                { emoji: '🚤', name: 'Speedboat', unicode: 'U+1F6A4' },
                { emoji: '🚢', name: 'Ship', unicode: 'U+1F6A2' },
                { emoji: '⚓', name: 'Anchor', unicode: 'U+2693' },
                { emoji: '🚧', name: 'Construction', unicode: 'U+1F6A7' },
                { emoji: '⛽', name: 'Fuel Pump', unicode: 'U+26FD' },
                { emoji: '🚨', name: 'Police Car Light', unicode: 'U+1F6A8' },
                { emoji: '🚥', name: 'Horizontal Traffic Light', unicode: 'U+1F6A5' },
                { emoji: '🚦', name: 'Vertical Traffic Light', unicode: 'U+1F6A6' },
                { emoji: '🚏', name: 'Bus Stop', unicode: 'U+1F68F' },
                { emoji: '🌍', name: 'Earth Globe Europe-Africa', unicode: 'U+1F30D' },
                { emoji: '🌎', name: 'Earth Globe Americas', unicode: 'U+1F30E' },
                { emoji: '🌏', name: 'Earth Globe Asia-Australia', unicode: 'U+1F30F' },
                { emoji: '🌐', name: 'Globe with Meridians', unicode: 'U+1F310' },
                { emoji: '🌑', name: 'New Moon', unicode: 'U+1F311' },
                { emoji: '🌕', name: 'Full Moon', unicode: 'U+1F315' },
                { emoji: '🌙', name: 'Crescent Moon', unicode: 'U+1F319' },
                { emoji: '🌞', name: 'Sun with Face', unicode: 'U+1F31E' },
                { emoji: '⭐', name: 'Star', unicode: 'U+2B50' },
                { emoji: '🌟', name: 'Glowing Star', unicode: 'U+1F31F' },
                { emoji: '🌠', name: 'Shooting Star', unicode: 'U+1F320' },
                { emoji: '⛅', name: 'Sun Behind Cloud', unicode: 'U+26C5' },
                { emoji: '🌈', name: 'Rainbow', unicode: 'U+1F308' },
                { emoji: '🌂', name: 'Closed Umbrella', unicode: 'U+1F302' },
                { emoji: '☂️', name: 'Umbrella', unicode: 'U+2602' },
                { emoji: '☔', name: 'Umbrella with Rain Drops', unicode: 'U+2614' },
                { emoji: '⚡', name: 'High Voltage', unicode: 'U+26A1' },
                { emoji: '❄️', name: 'Snowflake', unicode: 'U+2744' },
                { emoji: '☃️', name: 'Snowman', unicode: 'U+2603' },
                { emoji: '⛄', name: 'Snowman Without Snow', unicode: 'U+26C4' },
                { emoji: '🔥', name: 'Fire', unicode: 'U+1F525' },
                { emoji: '💧', name: 'Droplet', unicode: 'U+1F4A7' },
                { emoji: '🌊', name: 'Water Wave', unicode: 'U+1F30A' }
            ]
        },
        objects: {
            name: 'Objects',
            icon: '📱',
            emojis: [
                { emoji: '⌚', name: 'Watch', unicode: 'U+231A' },
                { emoji: '📱', name: 'Mobile Phone', unicode: 'U+1F4F1' },
                { emoji: '💻', name: 'Laptop Computer', unicode: 'U+1F4BB' },
                { emoji: '🖥️', name: 'Desktop Computer', unicode: 'U+1F5A5' },
                { emoji: '📷', name: 'Camera', unicode: 'U+1F4F7' },
                { emoji: '📹', name: 'Video Camera', unicode: 'U+1F4F9' },
                { emoji: '🎥', name: 'Movie Camera', unicode: 'U+1F3A5' },
                { emoji: '📞', name: 'Telephone Receiver', unicode: 'U+1F4DE' },
                { emoji: '☎️', name: 'Telephone', unicode: 'U+260E' },
                { emoji: '📺', name: 'Television', unicode: 'U+1F4FA' },
                { emoji: '📻', name: 'Radio', unicode: 'U+1F4FB' },
                { emoji: '⏰', name: 'Alarm Clock', unicode: 'U+23F0' },
                { emoji: '⏳', name: 'Hourglass Not Done', unicode: 'U+23F3' },
                { emoji: '⌛', name: 'Hourglass Done', unicode: 'U+231B' },
                { emoji: '🔋', name: 'Battery', unicode: 'U+1F50B' },
                { emoji: '🔌', name: 'Electric Plug', unicode: 'U+1F50C' },
                { emoji: '💡', name: 'Light Bulb', unicode: 'U+1F4A1' },
                { emoji: '🔦', name: 'Flashlight', unicode: 'U+1F526' },
                { emoji: '💰', name: 'Money Bag', unicode: 'U+1F4B0' },
                { emoji: '💳', name: 'Credit Card', unicode: 'U+1F4B3' },
                { emoji: '💎', name: 'Gem Stone', unicode: 'U+1F48E' },
                { emoji: '🔧', name: 'Wrench', unicode: 'U+1F527' },
                { emoji: '🔨', name: 'Hammer', unicode: 'U+1F528' },
                { emoji: '🔩', name: 'Nut and Bolt', unicode: 'U+1F529' },
                { emoji: '🔪', name: 'Kitchen Knife', unicode: 'U+1F52A' },
                { emoji: '🔮', name: 'Crystal Ball', unicode: 'U+1F52E' },
                { emoji: '🔭', name: 'Telescope', unicode: 'U+1F52D' },
                { emoji: '🔬', name: 'Microscope', unicode: 'U+1F52C' },
                { emoji: '💊', name: 'Pill', unicode: 'U+1F48A' },
                { emoji: '💉', name: 'Syringe', unicode: 'U+1F489' },
                { emoji: '🚽', name: 'Toilet', unicode: 'U+1F6BD' },
                { emoji: '🚿', name: 'Shower', unicode: 'U+1F6BF' },
                { emoji: '🛁', name: 'Bathtub', unicode: 'U+1F6C1' },
                { emoji: '🔑', name: 'Key', unicode: 'U+1F511' },
                { emoji: '🚪', name: 'Door', unicode: 'U+1F6AA' },
                { emoji: '🎁', name: 'Wrapped Gift', unicode: 'U+1F381' },
                { emoji: '🎈', name: 'Balloon', unicode: 'U+1F388' },
                { emoji: '🎀', name: 'Ribbon', unicode: 'U+1F380' },
                { emoji: '🎊', name: 'Confetti Ball', unicode: 'U+1F38A' },
                { emoji: '🎉', name: 'Party Popper', unicode: 'U+1F389' },
                { emoji: '📦', name: 'Package', unicode: 'U+1F4E6' }
            ]
        },
        programming: {
            name: 'Programming & Software Engineering',
            icon: '💻',
            emojis: [
                { emoji: '💻', name: 'Laptop Computer', unicode: 'U+1F4BB' },
                { emoji: '🖥️', name: 'Desktop Computer', unicode: 'U+1F5A5' },
                { emoji: '⌨️', name: 'Keyboard', unicode: 'U+2328' },
                { emoji: '🖱️', name: 'Computer Mouse', unicode: 'U+1F5B1' },
                { emoji: '🖨️', name: 'Printer', unicode: 'U+1F5A8' },
                { emoji: '💾', name: 'Floppy Disk', unicode: 'U+1F4BE' },
                { emoji: '💿', name: 'Optical Disk', unicode: 'U+1F4BF' },
                { emoji: '📀', name: 'DVD', unicode: 'U+1F4C0' },
                { emoji: '💽', name: 'Computer Disk', unicode: 'U+1F4BD' },
                { emoji: '🔌', name: 'Electric Plug', unicode: 'U+1F50C' },
                { emoji: '🔋', name: 'Battery', unicode: 'U+1F50B' },
                { emoji: '📱', name: 'Mobile Phone', unicode: 'U+1F4F1' },
                { emoji: '📲', name: 'Mobile Phone with Arrow', unicode: 'U+1F4F2' },
                { emoji: '☎️', name: 'Telephone', unicode: 'U+260E' },
                { emoji: '📞', name: 'Telephone Receiver', unicode: 'U+1F4DE' },
                { emoji: '📟', name: 'Pager', unicode: 'U+1F4DF' },
                { emoji: '📠', name: 'Fax Machine', unicode: 'U+1F4E0' },
                { emoji: '📡', name: 'Satellite Antenna', unicode: 'U+1F4E1' },
                { emoji: '🌐', name: 'Globe with Meridians', unicode: 'U+1F310' },
                { emoji: '🌍', name: 'Earth Globe Europe-Africa', unicode: 'U+1F30D' },
                { emoji: '🌎', name: 'Earth Globe Americas', unicode: 'U+1F30E' },
                { emoji: '🌏', name: 'Earth Globe Asia-Australia', unicode: 'U+1F30F' },
                { emoji: '🔗', name: 'Link', unicode: 'U+1F517' },
                { emoji: '📧', name: 'E-Mail', unicode: 'U+1F4E7' },
                { emoji: '📨', name: 'Incoming Envelope', unicode: 'U+1F4E8' },
                { emoji: '📩', name: 'Envelope with Arrow', unicode: 'U+1F4E9' },
                { emoji: '📤', name: 'Outbox Tray', unicode: 'U+1F4E4' },
                { emoji: '📥', name: 'Inbox Tray', unicode: 'U+1F4E5' },
                { emoji: '📦', name: 'Package', unicode: 'U+1F4E6' },
                { emoji: '📂', name: 'Open File Folder', unicode: 'U+1F4C2' },
                { emoji: '📁', name: 'File Folder', unicode: 'U+1F4C1' },
                { emoji: '🗂️', name: 'Card Index Dividers', unicode: 'U+1F5C2' },
                { emoji: '🗃️', name: 'Card File Box', unicode: 'U+1F5C3' },
                { emoji: '🗄️', name: 'File Cabinet', unicode: 'U+1F5C4' },
                { emoji: '🗑️', name: 'Wastebasket', unicode: 'U+1F5D1' },
                { emoji: '🔒', name: 'Locked', unicode: 'U+1F512' },
                { emoji: '🔓', name: 'Unlocked', unicode: 'U+1F513' },
                { emoji: '🔐', name: 'Locked with Key', unicode: 'U+1F510' },
                { emoji: '🔑', name: 'Key', unicode: 'U+1F511' },
                { emoji: '🗝️', name: 'Old Key', unicode: 'U+1F5DD' },
                { emoji: '🔨', name: 'Hammer', unicode: 'U+1F528' },
                { emoji: '🔧', name: 'Wrench', unicode: 'U+1F527' },
                { emoji: '⚙️', name: 'Gear', unicode: 'U+2699' },
                { emoji: '🛠️', name: 'Hammer and Wrench', unicode: 'U+1F6E0' },
                { emoji: '🔩', name: 'Nut and Bolt', unicode: 'U+1F529' },
                { emoji: '⚡', name: 'High Voltage', unicode: 'U+26A1' },
                { emoji: '🔥', name: 'Fire', unicode: 'U+1F525' },
                { emoji: '💡', name: 'Light Bulb', unicode: 'U+1F4A1' },
                { emoji: '🔦', name: 'Flashlight', unicode: 'U+1F526' },
                { emoji: '🔍', name: 'Magnifying Glass Tilted Left', unicode: 'U+1F50D' },
                { emoji: '🔎', name: 'Magnifying Glass Tilted Right', unicode: 'U+1F50E' },
                { emoji: '🔬', name: 'Microscope', unicode: 'U+1F52C' },
                { emoji: '🔭', name: 'Telescope', unicode: 'U+1F52D' },
                { emoji: '📊', name: 'Bar Chart', unicode: 'U+1F4CA' },
                { emoji: '📈', name: 'Chart Increasing', unicode: 'U+1F4C8' },
                { emoji: '📉', name: 'Chart Decreasing', unicode: 'U+1F4C9' },
                { emoji: '📋', name: 'Clipboard', unicode: 'U+1F4CB' },
                { emoji: '📌', name: 'Pushpin', unicode: 'U+1F4CC' },
                { emoji: '📍', name: 'Round Pushpin', unicode: 'U+1F4CD' },
                { emoji: '📎', name: 'Paperclip', unicode: 'U+1F4CE' },
                { emoji: '🖇️', name: 'Linked Paperclips', unicode: 'U+1F587' },
                { emoji: '📏', name: 'Straight Ruler', unicode: 'U+1F4CF' },
                { emoji: '📐', name: 'Triangular Ruler', unicode: 'U+1F4D0' },
                { emoji: '✂️', name: 'Scissors', unicode: 'U+2702' },
                { emoji: '🖊️', name: 'Pen', unicode: 'U+1F58A' },
                { emoji: '🖋️', name: 'Fountain Pen', unicode: 'U+1F58B' },
                { emoji: '✒️', name: 'Black Nib', unicode: 'U+2712' },
                { emoji: '🖌️', name: 'Paintbrush', unicode: 'U+1F58C' },
                { emoji: '🖍️', name: 'Crayon', unicode: 'U+1F58D' },
                { emoji: '📝', name: 'Memo', unicode: 'U+1F4DD' },
                { emoji: '📄', name: 'Page Facing Up', unicode: 'U+1F4C4' },
                { emoji: '📃', name: 'Page with Curl', unicode: 'U+1F4C3' },
                { emoji: '📑', name: 'Bookmark Tabs', unicode: 'U+1F4D1' },
                { emoji: '📜', name: 'Scroll', unicode: 'U+1F4DC' },
                { emoji: '📄', name: 'Page Facing Up', unicode: 'U+1F4C4' },
                { emoji: '📰', name: 'Newspaper', unicode: 'U+1F4F0' },
                { emoji: '🗞️', name: 'Rolled-Up Newspaper', unicode: 'U+1F5DE' },
                { emoji: '📓', name: 'Notebook', unicode: 'U+1F4D3' },
                { emoji: '📔', name: 'Notebook with Decorative Cover', unicode: 'U+1F4D4' },
                { emoji: '📒', name: 'Ledger', unicode: 'U+1F4D2' },
                { emoji: '📕', name: 'Closed Book', unicode: 'U+1F4D5' },
                { emoji: '📗', name: 'Green Book', unicode: 'U+1F4D7' },
                { emoji: '📘', name: 'Blue Book', unicode: 'U+1F4D8' },
                { emoji: '📙', name: 'Orange Book', unicode: 'U+1F4D9' },
                { emoji: '📚', name: 'Books', unicode: 'U+1F4DA' },
                { emoji: '📖', name: 'Open Book', unicode: 'U+1F4D6' },
                { emoji: '🔖', name: 'Bookmark', unicode: 'U+1F516' },
                { emoji: '🏷️', name: 'Label', unicode: 'U+1F3F7' },
                { emoji: '🚀', name: 'Rocket', unicode: 'U+1F680' },
                { emoji: '🛸', name: 'Flying Saucer', unicode: 'U+1F6F8' },
                { emoji: '🎯', name: 'Direct Hit', unicode: 'U+1F3AF' },
                { emoji: '🏆', name: 'Trophy', unicode: 'U+1F3C6' },
                { emoji: '🥇', name: 'First Place Medal', unicode: 'U+1F947' },
                { emoji: '🥈', name: 'Second Place Medal', unicode: 'U+1F948' },
                { emoji: '🥉', name: 'Third Place Medal', unicode: 'U+1F949' },
                { emoji: '🏅', name: 'Sports Medal', unicode: 'U+1F3C5' },
                { emoji: '🎖️', name: 'Military Medal', unicode: 'U+1F396' },
                { emoji: '⚖️', name: 'Balance Scale', unicode: 'U+2696' },
                { emoji: '🔭', name: 'Telescope', unicode: 'U+1F52D' },
                { emoji: '🧪', name: 'Test Tube', unicode: 'U+1F9EA' },
                { emoji: '⚗️', name: 'Alembic', unicode: 'U+2697' },
                { emoji: '🧬', name: 'DNA', unicode: 'U+1F9EC' },
                { emoji: '🔬', name: 'Microscope', unicode: 'U+1F52C' },
                { emoji: '🦠', name: 'Microbe', unicode: 'U+1F9A0' },
                { emoji: '💊', name: 'Pill', unicode: 'U+1F48A' },
                { emoji: '🩹', name: 'Adhesive Bandage', unicode: 'U+1FA79' },
                { emoji: '🩺', name: 'Stethoscope', unicode: 'U+1FA7A' },
                { emoji: '💉', name: 'Syringe', unicode: 'U+1F489' },
                { emoji: '🧮', name: 'Abacus', unicode: 'U+1F9EE' },
                { emoji: '🔢', name: 'Input Numbers', unicode: 'U+1F522' },
                { emoji: '🔣', name: 'Input Symbols', unicode: 'U+1F523' },
                { emoji: '🔤', name: 'Input Latin Letters', unicode: 'U+1F524' },
                { emoji: '🔡', name: 'Input Latin Lowercase', unicode: 'U+1F521' },
                { emoji: '🔠', name: 'Input Latin Uppercase', unicode: 'U+1F520' },
                { emoji: 'ℹ️', name: 'Information', unicode: 'U+2139' },
                { emoji: '🆔', name: 'ID Button', unicode: 'U+1F194' },
                { emoji: '🆕', name: 'New Button', unicode: 'U+1F195' },
                { emoji: '🆙', name: 'Up Button', unicode: 'U+1F199' },
                { emoji: '🆒', name: 'Cool Button', unicode: 'U+1F192' },
                { emoji: '🆓', name: 'Free Button', unicode: 'U+1F193' },
                { emoji: '🆖', name: 'NG Button', unicode: 'U+1F196' },
                { emoji: '🆗', name: 'OK Button', unicode: 'U+1F197' },
                { emoji: '🆘', name: 'SOS Button', unicode: 'U+1F198' },
                { emoji: '🆚', name: 'VS Button', unicode: 'U+1F19A' },
                { emoji: '🅰️', name: 'A Button (Blood Type)', unicode: 'U+1F170' },
                { emoji: '🅱️', name: 'B Button (Blood Type)', unicode: 'U+1F171' },
                { emoji: '🅾️', name: 'O Button (Blood Type)', unicode: 'U+1F17E' },
                { emoji: '🆎', name: 'AB Button (Blood Type)', unicode: 'U+1F18E' },
                { emoji: '🅿️', name: 'P Button', unicode: 'U+1F17F' },
                { emoji: '🆑', name: 'CL Button', unicode: 'U+1F191' },
                { emoji: '🇨', name: 'C', unicode: 'U+1F1E8' },
                { emoji: '🇯', name: 'J', unicode: 'U+1F1EF' },
                { emoji: '🇵', name: 'P', unicode: 'U+1F1F5' },
                { emoji: '🇸', name: 'S', unicode: 'U+1F1F8' },
                { emoji: '🇭', name: 'H', unicode: 'U+1F1ED' },
                { emoji: '🇷', name: 'R', unicode: 'U+1F1F7' },
                { emoji: '🇫', name: 'F', unicode: 'U+1F1EB' },
                { emoji: '🇬', name: 'G', unicode: 'U+1F1EC' },
                { emoji: '🇲', name: 'M', unicode: 'U+1F1F2' },
                { emoji: '🇳', name: 'N', unicode: 'U+1F1F3' },
                { emoji: '🇱', name: 'L', unicode: 'U+1F1F1' },
                { emoji: '🇰', name: 'K', unicode: 'U+1F1F0' },
                { emoji: '🇩', name: 'D', unicode: 'U+1F1E9' },
                { emoji: '🇧', name: 'B', unicode: 'U+1F1E7' },
                { emoji: '🇦', name: 'A', unicode: 'U+1F1E6' },
                { emoji: '🇻', name: 'V', unicode: 'U+1F1FB' },
                { emoji: '🇹', name: 'T', unicode: 'U+1F1F9' },
                { emoji: '🇺', name: 'U', unicode: 'U+1F1FA' },
                { emoji: '🇮', name: 'I', unicode: 'U+1F1EE' },
                { emoji: '🇴', name: 'O', unicode: 'U+1F1F4' },
                { emoji: '🇪', name: 'E', unicode: 'U+1F1EA' },
                { emoji: '🇼', name: 'W', unicode: 'U+1F1FC' },
                { emoji: '🇽', name: 'X', unicode: 'U+1F1FD' },
                { emoji: '🇾', name: 'Y', unicode: 'U+1F1FE' },
                { emoji: '🇿', name: 'Z', unicode: 'U+1F1FF' },
                { emoji: '🇶', name: 'Q', unicode: 'U+1F1F6' }
            ]
        },
        symbols: {
            name: 'Symbols',
            icon: '❤️',
            emojis: [
                { emoji: '❤️', name: 'Red Heart', unicode: 'U+2764' },
                { emoji: '🧡', name: 'Orange Heart', unicode: 'U+1F9E1' },
                { emoji: '💛', name: 'Yellow Heart', unicode: 'U+1F49B' },
                { emoji: '💚', name: 'Green Heart', unicode: 'U+1F49A' },
                { emoji: '💙', name: 'Blue Heart', unicode: 'U+1F499' },
                { emoji: '💜', name: 'Purple Heart', unicode: 'U+1F49C' },
                { emoji: '🖤', name: 'Black Heart', unicode: 'U+1F5A4' },
                { emoji: '🤍', name: 'White Heart', unicode: 'U+1F90D' },
                { emoji: '🤎', name: 'Brown Heart', unicode: 'U+1F90E' },
                { emoji: '💔', name: 'Broken Heart', unicode: 'U+1F494' },
                { emoji: '💕', name: 'Two Hearts', unicode: 'U+1F495' },
                { emoji: '💞', name: 'Revolving Hearts', unicode: 'U+1F49E' },
                { emoji: '💓', name: 'Beating Heart', unicode: 'U+1F493' },
                { emoji: '💗', name: 'Growing Heart', unicode: 'U+1F497' },
                { emoji: '💖', name: 'Sparkling Heart', unicode: 'U+1F496' },
                { emoji: '💘', name: 'Heart with Arrow', unicode: 'U+1F498' },
                { emoji: '💝', name: 'Heart with Ribbon', unicode: 'U+1F49D' },
                { emoji: '💟', name: 'Heart Decoration', unicode: 'U+1F49F' },
                { emoji: '⭕', name: 'Hollow Red Circle', unicode: 'U+2B55' },
                { emoji: '❌', name: 'Cross Mark', unicode: 'U+274C' },
                { emoji: '❗', name: 'Exclamation Mark', unicode: 'U+2757' },
                { emoji: '❓', name: 'Question Mark', unicode: 'U+2753' },
                { emoji: '⚠️', name: 'Warning', unicode: 'U+26A0' },
                { emoji: '🚫', name: 'Prohibited', unicode: 'U+1F6AB' },
                { emoji: '💯', name: 'Hundred Points', unicode: 'U+1F4AF' },
                { emoji: '✅', name: 'Check Mark Button', unicode: 'U+2705' },
                { emoji: '❎', name: 'Cross Mark Button', unicode: 'U+274E' },
                { emoji: '🔴', name: 'Red Circle', unicode: 'U+1F534' },
                { emoji: '🟠', name: 'Orange Circle', unicode: 'U+1F7E0' },
                { emoji: '🟡', name: 'Yellow Circle', unicode: 'U+1F7E1' },
                { emoji: '🟢', name: 'Green Circle', unicode: 'U+1F7E2' },
                { emoji: '🔵', name: 'Blue Circle', unicode: 'U+1F535' },
                { emoji: '🟣', name: 'Purple Circle', unicode: 'U+1F7E3' },
                { emoji: '⚫', name: 'Black Circle', unicode: 'U+26AB' },
                { emoji: '⚪', name: 'White Circle', unicode: 'U+26AA' },
                { emoji: '🟤', name: 'Brown Circle', unicode: 'U+1F7E4' },
                { emoji: '🔺', name: 'Red Triangle Pointed Up', unicode: 'U+1F53A' },
                { emoji: '🔻', name: 'Red Triangle Pointed Down', unicode: 'U+1F53B' },
                { emoji: '🔸', name: 'Orange Diamond', unicode: 'U+1F538' },
                { emoji: '🔹', name: 'Blue Diamond', unicode: 'U+1F539' },
                { emoji: '🔶', name: 'Orange Diamond', unicode: 'U+1F536' },
                { emoji: '🔷', name: 'Blue Diamond', unicode: 'U+1F537' },
                { emoji: '⬆️', name: 'Up Arrow', unicode: 'U+2B06' },
                { emoji: '↗️', name: 'Up-Right Arrow', unicode: 'U+2197' },
                { emoji: '➡️', name: 'Right Arrow', unicode: 'U+27A1' },
                { emoji: '↘️', name: 'Down-Right Arrow', unicode: 'U+2198' },
                { emoji: '⬇️', name: 'Down Arrow', unicode: 'U+2B07' },
                { emoji: '↙️', name: 'Down-Left Arrow', unicode: 'U+2199' },
                { emoji: '⬅️', name: 'Left Arrow', unicode: 'U+2B05' },
                { emoji: '↖️', name: 'Up-Left Arrow', unicode: 'U+2196' },
                { emoji: '↕️', name: 'Up-Down Arrow', unicode: 'U+2195' },
                { emoji: '↔️', name: 'Left-Right Arrow', unicode: 'U+2194' },
                { emoji: '↩️', name: 'Right Arrow Curving Left', unicode: 'U+21A9' },
                { emoji: '↪️', name: 'Left Arrow Curving Right', unicode: 'U+21AA' },
                { emoji: '⤴️', name: 'Right Arrow Curving Up', unicode: 'U+2934' },
                { emoji: '⤵️', name: 'Right Arrow Curving Down', unicode: 'U+2935' },
                { emoji: '🔄', name: 'Counterclockwise Arrows Button', unicode: 'U+1F504' },
                { emoji: '🔃', name: 'Clockwise Vertical Arrows', unicode: 'U+1F503' },
                { emoji: '🔀', name: 'Twisted Rightwards Arrows', unicode: 'U+1F500' },
                { emoji: '🔁', name: 'Repeat Button', unicode: 'U+1F501' },
                { emoji: '🔂', name: 'Repeat Single Button', unicode: 'U+1F502' },
                { emoji: '▶️', name: 'Play Button', unicode: 'U+25B6' },
                { emoji: '⏸️', name: 'Pause Button', unicode: 'U+23F8' },
                { emoji: '⏹️', name: 'Stop Button', unicode: 'U+23F9' },
                { emoji: '⏺️', name: 'Record Button', unicode: 'U+23FA' },
                { emoji: '⏩', name: 'Fast-Forward Button', unicode: 'U+23E9' },
                { emoji: '⏪', name: 'Fast Reverse Button', unicode: 'U+23EA' },
                { emoji: '⏫', name: 'Fast Up Button', unicode: 'U+23EB' },
                { emoji: '⏬', name: 'Fast Down Button', unicode: 'U+23EC' },
                { emoji: '◀️', name: 'Reverse Button', unicode: 'U+25C0' },
                { emoji: '🔼', name: 'Upwards Button', unicode: 'U+1F53C' },
                { emoji: '🔽', name: 'Downwards Button', unicode: 'U+1F53D' },
                { emoji: '🎵', name: 'Musical Note', unicode: 'U+1F3B5' },
                { emoji: '🎶', name: 'Musical Notes', unicode: 'U+1F3B6' },
                { emoji: '🎼', name: 'Musical Score', unicode: 'U+1F3BC' },
                { emoji: '🎤', name: 'Microphone', unicode: 'U+1F3A4' },
                { emoji: '🎧', name: 'Headphone', unicode: 'U+1F3A7' },
                { emoji: '🎸', name: 'Guitar', unicode: 'U+1F3B8' },
                { emoji: '🎹', name: 'Musical Keyboard', unicode: 'U+1F3B9' },
                { emoji: '🎺', name: 'Trumpet', unicode: 'U+1F3BA' },
                { emoji: '🎻', name: 'Violin', unicode: 'U+1F3BB' },
                { emoji: '🥁', name: 'Drum', unicode: 'U+1F941' },
                { emoji: '🎯', name: 'Direct Hit', unicode: 'U+1F3AF' },
                { emoji: '🎮', name: 'Video Game', unicode: 'U+1F3AE' },
                { emoji: '🎲', name: 'Game Die', unicode: 'U+1F3B2' },
                { emoji: '🎳', name: 'Bowling', unicode: 'U+1F3B3' },
                { emoji: '🎱', name: 'Pool 8 Ball', unicode: 'U+1F3B1' },
                { emoji: '🎰', name: 'Slot Machine', unicode: 'U+1F3B0' },
                { emoji: '🎴', name: 'Flower Playing Cards', unicode: 'U+1F3B4' },
                { emoji: '🃏', name: 'Joker', unicode: 'U+1F0CF' },
                { emoji: '🀄', name: 'Mahjong Red Dragon', unicode: 'U+1F004' },
                { emoji: '🧩', name: 'Puzzle Piece', unicode: 'U+1F9E9' },
                { emoji: '🔔', name: 'Bell', unicode: 'U+1F514' },
                { emoji: '🔕', name: 'Bell with Slash', unicode: 'U+1F515' },
                { emoji: '🔇', name: 'Muted Speaker', unicode: 'U+1F507' },
                { emoji: '🔈', name: 'Speaker Low Volume', unicode: 'U+1F508' },
                { emoji: '🔉', name: 'Speaker Medium Volume', unicode: 'U+1F509' },
                { emoji: '🔊', name: 'Speaker High Volume', unicode: 'U+1F50A' },
                { emoji: '📢', name: 'Loudspeaker', unicode: 'U+1F4E2' },
                { emoji: '📣', name: 'Megaphone', unicode: 'U+1F4E3' },
                { emoji: '📯', name: 'Postal Horn', unicode: 'U+1F4EF' },
                { emoji: '🎺', name: 'Trumpet', unicode: 'U+1F3BA' },
                { emoji: '🎷', name: 'Saxophone', unicode: 'U+1F3B7' }
            ]
        }
    };

    // Get all emojis for filtering
    const getAllEmojis = () => {
        return Object.values(emojiDatabase).reduce((acc, category) => {
            return acc.concat(category.emojis);
        }, []);
    };

    // Filter emojis based on search term and category
    const getFilteredEmojis = useCallback(() => {
        const allEmojis = getAllEmojis();
        
        let filtered = allEmojis;
        
        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = emojiDatabase[selectedCategory]?.emojis || [];
        }
        
        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(emoji => 
                emoji.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                emoji.emoji.includes(searchTerm)
            );
        }
        
        return filtered;
    }, [selectedCategory, searchTerm]);

    // Copy emoji to clipboard
    const copyEmoji = async (emoji) => {
        try {
            await navigator.clipboard.writeText(emoji);
            setCopiedEmoji(emoji);
            setTimeout(() => setCopiedEmoji(null), 2000);
        } catch (err) {
            console.error('Failed to copy emoji:', err);
        }
    };

    // Convert Unicode to Emoji
    const convertUnicodeToEmoji = (input) => {
        if (!input.trim()) {
            setConvertedEmoji('');
            setUnicodeError('');
            return;
        }

        try {
            let codePoint;
            const cleanInput = input.trim();

            // Handle different Unicode formats
            if (cleanInput.startsWith('U+')) {
                // Format: U+1F600
                codePoint = parseInt(cleanInput.substring(2), 16);
            } else if (cleanInput.startsWith('\\u')) {
                // Format: \u1F600
                codePoint = parseInt(cleanInput.substring(2), 16);
            } else if (cleanInput.startsWith('0x')) {
                // Format: 0x1F600
                codePoint = parseInt(cleanInput.substring(2), 16);
            } else if (cleanInput.startsWith('#')) {
                // Format: #1F600
                codePoint = parseInt(cleanInput.substring(1), 16);
            } else if (/^[0-9A-Fa-f]+$/.test(cleanInput)) {
                // Format: 1F600 (plain hex)
                codePoint = parseInt(cleanInput, 16);
            } else if (/^\d+$/.test(cleanInput)) {
                // Format: 128512 (decimal)
                codePoint = parseInt(cleanInput, 10);
            } else {
                setUnicodeError('Invalid format. Try: U+1F600, 1F600, 128512, 0x1F600, \\u1F600, or #1F600');
                setConvertedEmoji('');
                return;
            }

            // Validate code point range
            if (codePoint < 0 || codePoint > 0x10FFFF) {
                setUnicodeError('Unicode code point out of range (0-0x10FFFF)');
                setConvertedEmoji('');
                return;
            }

            // Convert to emoji
            const emoji = String.fromCodePoint(codePoint);
            setConvertedEmoji(emoji);
            setUnicodeError('');

        } catch (error) {
            setUnicodeError('Invalid Unicode input. Please check the format.');
            setConvertedEmoji('');
        }
    };

    // Handle Unicode input change
    const handleUnicodeInputChange = (e) => {
        const value = e.target.value;
        setUnicodeInput(value);
        convertUnicodeToEmoji(value);
    };

    // Copy converted emoji
    const copyConvertedEmoji = async () => {
        if (convertedEmoji) {
            await copyEmoji(convertedEmoji);
        }
    };

    // Get category stats
    const getCategoryStats = () => {
        const allEmojis = getAllEmojis();
        const categoryStats = {};
        
        Object.keys(emojiDatabase).forEach(key => {
            categoryStats[key] = emojiDatabase[key].emojis.length;
        });
        
        return {
            total: allEmojis.length,
            categories: categoryStats
        };
    };

    const stats = getCategoryStats();
    const filteredEmojis = getFilteredEmojis();

    return (
        <div className="emoji-picker">
            <div className="header-section">
                <h1 className="page-title">🎭 Emoji Picker</h1>
                <p className="page-description">
                    Browse and copy emojis with Unicode information. Search by name or browse by category.
                </p>
            </div>

            <div className="controls-section">
                <div className="search-container">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search emojis..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="filters-container">
                    <div className="filter-group">
                        <label>Category</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">All Categories</option>
                            {Object.entries(emojiDatabase).map(([key, category]) => (
                                <option key={key} value={key}>
                                    {category.icon} {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Unicode Display</label>
                        <select
                            value={showUnicode}
                            onChange={(e) => setShowUnicode(e.target.value === 'true')}
                            className="filter-select"
                        >
                            <option value="true">Show Unicode</option>
                            <option value="false">Hide Unicode</option>
                        </select>
                    </div>
                </div>

                <div className="unicode-converter">
                    <h3>Unicode to Emoji Converter</h3>
                    <div className="converter-container">
                        <div className="converter-input-group">
                            <input
                                type="text"
                                placeholder="Enter Unicode (e.g., U+1F600, 1F600, 128512)"
                                value={unicodeInput}
                                onChange={handleUnicodeInputChange}
                                className="unicode-input"
                            />
                            <div className="converter-result">
                                {convertedEmoji && (
                                    <div className="converted-emoji-display">
                                        <span className="converted-emoji">{convertedEmoji}</span>
                                        <button
                                            onClick={copyConvertedEmoji}
                                            className="copy-converted-btn"
                                            title="Copy emoji"
                                        >
                                            📋
                                        </button>
                                    </div>
                                )}
                                {unicodeError && (
                                    <div className="unicode-error">{unicodeError}</div>
                                )}
                            </div>
                        </div>
                        <div className="converter-help">
                            <p>Supported formats: U+1F600, 1F600, 128512, 0x1F600, \u1F600, #1F600</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="stats-section">
                <div className="stat-card">
                    <span className="stat-number">{stats.total}</span>
                    <span className="stat-label">Total Emojis</span>
                </div>
                <div className="stat-card">
                    <span className="stat-number">{Object.keys(emojiDatabase).length}</span>
                    <span className="stat-label">Categories</span>
                </div>
                <div className="stat-card">
                    <span className="stat-number">{filteredEmojis.length}</span>
                    <span className="stat-label">Showing</span>
                </div>
            </div>

            <div className="emoji-grid">
                {filteredEmojis.map((emojiData, index) => (
                    <div key={index} className="emoji-card">
                        <div className="emoji-display">
                            <span className="emoji-symbol">{emojiData.emoji}</span>
                            <button
                                onClick={() => copyEmoji(emojiData.emoji)}
                                className={`copy-btn ${copiedEmoji === emojiData.emoji ? 'copied' : ''}`}
                                title="Copy emoji"
                            >
                                {copiedEmoji === emojiData.emoji ? '✓' : '📋'}
                            </button>
                        </div>
                        <div className="emoji-info">
                            <div className="emoji-name">{emojiData.name}</div>
                            {showUnicode && (
                                <div className="emoji-unicode">{emojiData.unicode}</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {filteredEmojis.length === 0 && (
                <div className="no-results">
                    <div className="no-results-icon">🔍</div>
                    <h3>No emojis found</h3>
                    <p>Try adjusting your search or category filter</p>
                </div>
            )}

            <div className="footer-section">
                <div className="category-stats">
                    <h3>Category Breakdown</h3>
                    <div className="category-list">
                        {Object.entries(emojiDatabase).map(([key, category]) => (
                            <div key={key} className="category-item">
                                <span className="category-icon">{category.icon}</span>
                                <span className="category-name">{category.name}</span>
                                <span className="category-count">{category.emojis.length}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmojiPicker;