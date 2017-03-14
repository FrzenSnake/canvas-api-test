class User {
	public static user: User;
	private level: number;
	public statemachine: StateMachine;
	public List: CommandList;
	// pet: Pet;

	heroes: Hero[] = [];

	constructor(statemachine: StateMachine, level: number) {
		this.statemachine = statemachine;
		this.level = level;
		this.List = new CommandList();
		if (!User.user) {
			User.user = this;
		}
		return User.user;
	}



	//高阶属性写法

	get heroesInTeam() {
		return this.heroes.filter(hero => hero.isInTeam);//过滤器，过滤所有在队伍中的英雄isInteam
	}



	AddHero(hero: Hero) {
		this.heroes.push(hero);
	}

}
