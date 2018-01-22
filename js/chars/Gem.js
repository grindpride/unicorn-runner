const GEM = {
    imageURL: 'img/gem.png',
    frames: [
        {
            name: 'gem1',
            rect: [0, 0, 93, 93]
        }
    ],
    animations: [
        {
            name: 'gem',
            frameLen: 0.2,
            frames: [
                'gem1'
            ]
        }
    ]
};

function loadGem() {
    return loadSpriteSheet(GEM)
    .then(createGemFactory);
}

class BehaviorGem extends Trait {
    constructor() {
        super('behavior');
    }

    collides(us, them) {
        if (us.pickable.picked) {
            return;
        }

        us.pickable.pick();
        us.vel.set(30, -400);
        us.solid.obstructs = false;
    }
}


function createGemFactory(sprite) {
    const animation = sprite.animations.get('gem');

    function routeAnim(gem) {
        return animation(gem.lifetime);
    }

    function drawGem(context) {
        // console.log('gem draw')
        sprite.draw(routeAnim(this), context, 0, 0, this.vel.x < 0);
    }

    return function createGem() {
        const gem = new Entity();
        gem.size.set(83, 93);

        gem.addTrait(new Physics());
        gem.addTrait(new Solid());
        gem.addTrait(new Pickable());
        gem.addTrait(new BehaviorGem());

        gem.draw = drawGem;

        return gem;
    };
}
