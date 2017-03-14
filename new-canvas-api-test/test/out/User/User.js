var User = (function () {
    function User(statemachine, level) {
        // pet: Pet;
        this.heroes = [];
        this.statemachine = statemachine;
        this.level = level;
        this.List = new CommandList();
        if (!User.user) {
            User.user = this;
        }
        return User.user;
    }
    Object.defineProperty(User.prototype, "heroesInTeam", {
        //高阶属性写法
        get: function () {
            return this.heroes.filter(function (hero) { return hero.isInTeam; }); //过滤器，过滤所有在队伍中的英雄isInteam
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.AddHero = function (hero) {
        this.heroes.push(hero);
    };
    return User;
}());
