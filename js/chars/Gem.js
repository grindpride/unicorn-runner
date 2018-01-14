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

function loadRainbow() {
    return loadSpriteSheet(GEM)
    .then(createRainbowFactory);
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


function createRainbowFactory(sprite) {
    const sparkAnim = sprite.animations.get('gem');

    function routeAnim(rainbow) {
        return sparkAnim(rainbow.lifetime);
    }

    function drawRainbow(context) {
        sprite.draw(routeAnim(this), context, 0, 0, this.vel.x < 0);
    }

    return function createRainbow() {
        const rainbow = new Entity();
        rainbow.size.set(83, 93);

        rainbow.addTrait(new Physics());
        rainbow.addTrait(new Solid());
        rainbow.addTrait(new Pickable());
        rainbow.addTrait(new BehaviorGem());

        rainbow.draw = drawRainbow;

        return rainbow;
    };
}
