// Content library for Mythforge.
// Used two ways:
//  1. As seed material for the local fallback generator (no API key needed).
//  2. As category metadata (label + prompt hint) shown in the UI and sent
//     to the AI endpoint as instructions.

export const CATEGORY_META = {
  // --- World Building ---
  premise: {
    label: "World Premise",
    hint: "The one-line core idea your whole world hangs on.",
    aiInstruction: "Generate distinct high-fantasy WORLD PREMISE concepts — the single core idea a whole secondary-world setting could be built around (not Earth, not urban fantasy). Think in the spirit of 'a fractured empire held together by dying magic' or 'island nations connected by sky-roads'.",
  },
  geography: {
    label: "Geography & Climate",
    hint: "The physical shape of the world and how climate shapes its cultures.",
    aiInstruction: "Generate distinct GEOGRAPHY & CLIMATE concepts for a high-fantasy secondary world, consistent with the premise already chosen. Include enough physical detail (terrain, climate, notable natural features) that it would visibly shape the cultures living there.",
  },
  peoples: {
    label: "Dominant Peoples",
    hint: "Who lives here — human, non-human, or a mix — and their cultural flavor.",
    aiInstruction: "Generate distinct concepts for the DOMINANT PEOPLES of a high-fantasy world (can be human cultures, non-human peoples like elves/dwarves/fae-equivalents, or original invented peoples). Each should have a one-line cultural flavor, not just a species name.",
  },
  originMyth: {
    label: "Origin Myth",
    hint: "The story this world's peoples tell about how it all began.",
    aiInstruction: "Generate distinct ORIGIN MYTHS — the in-world legend about how this world, its magic, or its peoples came to be. Mythic tone, should feel like something told around a fire, not a textbook.",
  },
  historicalEvent: {
    label: "Defining Historical Event",
    hint: "A war, revolution, or catastrophe that still shapes the present.",
    aiInstruction: "Generate distinct DEFINING HISTORICAL EVENTS (a war, revolution, betrayal, or catastrophe) that happened in this world's past and still shapes its politics, culture, or magic today.",
  },
  government: {
    label: "Governing Power Structure",
    hint: "Who holds power, and how.",
    aiInstruction: "Generate distinct GOVERNING POWER STRUCTURES for this world — who holds power and how (monarchy, magocracy, council of houses, theocracy, fractured city-states, etc.), consistent with everything chosen so far.",
  },

  // --- Magic System ---
  magicSource: {
    label: "Source of Magic",
    hint: "Where magic actually comes from.",
    aiInstruction: "Generate distinct concepts for the SOURCE of magic in this world — where it comes from (a divine gift, a natural force, bloodline inheritance, a bargain with something old, a learned craft, etc.), consistent with the world bible so far and the chosen hard/soft leaning.",
  },
  magicAccess: {
    label: "Who Can Use It, and How",
    hint: "Access, training, and rules of use.",
    aiInstruction: "Generate distinct concepts for WHO CAN ACCESS this world's magic and HOW they use it (born with it vs. trained, rare vs. common, requires tools/rituals/words, legal vs. outlawed), consistent with the world bible so far.",
  },
  magicCosts: {
    label: "Costs & Limits",
    hint: "What it costs, and what it can't do.",
    aiInstruction: "Generate distinct concepts for the COSTS AND LIMITS of this world's magic — what using it costs the user (physical, mental, moral, social) and what it fundamentally cannot do, consistent with the world bible so far.",
  },
  magicAttitude: {
    label: "Cultural Attitude Toward Magic",
    hint: "Revered, feared, regulated, or hidden?",
    aiInstruction: "Generate distinct concepts for the CULTURAL ATTITUDE this world's peoples hold toward magic (revered and central to daily life, feared and suppressed, tightly regulated by the state, practiced in secret, commodified/monetized, etc.), consistent with the world bible so far.",
  },

  // --- Characters ---
  character_protagonist: {
    label: "Protagonist",
    hint: "Who this story actually follows.",
    aiInstruction: "Generate distinct PROTAGONIST concepts for a high-fantasy story set in this world. Each needs a name, a one-line hook, and a clear personal motivation — shaped by the world and magic system chosen so far.",
  },
  character_mentor: {
    label: "Mentor",
    hint: "Who teaches, guides, or complicates the protagonist's path.",
    aiInstruction: "Generate distinct MENTOR-figure concepts for this story — the character who guides, trains, or advises the protagonist (not necessarily wise or kind; a flawed or self-interested mentor is fair game). Name, one-line hook, and motivation, consistent with the world bible so far.",
  },
  character_rival: {
    label: "Rival / Love Interest",
    hint: "Who the protagonist is drawn to, in tension with, or both.",
    aiInstruction: "Generate distinct RIVAL-OR-LOVE-INTEREST concepts for this story — a character in direct personal tension with the protagonist, romantic, adversarial, or both at once. Name, one-line hook, and motivation, consistent with the world bible so far.",
  },
  character_antagonist: {
    label: "Antagonist",
    hint: "Who or what stands most directly against the protagonist.",
    aiInstruction: "Generate distinct ANTAGONIST concepts for this story — the character (or force) most directly opposed to the protagonist's goals. Give them a real, comprehensible motivation, not just villainy for its own sake. Name, one-line hook, and motivation, consistent with the world bible so far.",
  },

  // --- Plot: main beats (condensed Hero's Journey) ---
  beat_call: {
    label: "Ordinary World & Call to Adventure",
    hint: "Where the protagonist starts, and what disrupts it.",
    aiInstruction: "Generate distinct takes on the OPENING BEAT of this story: the protagonist's ordinary world and the specific event that calls them to adventure or disrupts their status quo. 2-3 sentences, grounded in the world/magic/characters chosen so far.",
  },
  beat_threshold: {
    label: "Crossing the Threshold",
    hint: "The point of no return.",
    aiInstruction: "Generate distinct takes on the CROSSING THE THRESHOLD beat: the moment the protagonist commits and leaves their ordinary world behind, for better or worse. 2-3 sentences, consistent with the story so far.",
  },
  beat_trials: {
    label: "Trials, Allies & Enemies",
    hint: "The middle stretch — tests, alliances, and setbacks.",
    aiInstruction: "Generate distinct takes on the TRIALS, ALLIES & ENEMIES beat: the middle stretch of the story where the protagonist is tested, gains or loses allies, and starts to understand the real shape of the conflict. 2-3 sentences.",
  },
  beat_ordeal: {
    label: "The Ordeal",
    hint: "The darkest, highest-stakes moment before the end.",
    aiInstruction: "Generate distinct takes on THE ORDEAL beat: the protagonist's lowest point or biggest confrontation yet, where everything is genuinely at risk. 2-3 sentences, high tension.",
  },
  beat_climax: {
    label: "Climax",
    hint: "The final confrontation.",
    aiInstruction: "Generate distinct takes on the CLIMAX beat: the final confrontation where the story's central conflict is decided. 2-3 sentences, consistent with everything chosen so far.",
  },
  beat_resolution: {
    label: "Resolution",
    hint: "How the protagonist — and the world — comes out changed.",
    aiInstruction: "Generate distinct takes on the RESOLUTION beat: how the story ends and how the protagonist (and their world) has been changed by it. 2-3 sentences.",
  },

  // --- Plot: subplot arc summaries (shown once a subplot type is picked) ---
  subplot_political: {
    label: "Political Intrigue Arc",
    hint: "How the political thread plays out alongside the main plot.",
    aiInstruction: "Generate distinct POLITICAL INTRIGUE subplot arcs for this story — factions, succession, betrayal, or impending war running alongside the main plot. Make it personal (duty vs. someone the protagonist loves), not just abstract politics. 2-3 sentences.",
  },
  subplot_darkRomance: {
    label: "Dark Romance Arc",
    hint: "How the dark-romance thread plays out.",
    aiInstruction: "Generate distinct DARK ROMANCE / ROMANTASY subplot arcs for this story — enemies-to-lovers, fated mates, forbidden love, or a morally grey love interest, with real stakes and tension. 2-3 sentences, consistent with the characters chosen so far.",
  },
  subplot_foundFamily: {
    label: "Found Family Arc",
    hint: "How the found-family thread plays out.",
    aiInstruction: "Generate distinct FOUND FAMILY subplot arcs for this story — how a group around the protagonist becomes an emotional home base alongside the main quest. 2-3 sentences.",
  },
  subplot_redemption: {
    label: "Redemption Arc",
    hint: "How the redemption thread plays out.",
    aiInstruction: "Generate distinct REDEMPTION ARC subplots for this story — a character (protagonist, ally, or even the antagonist) working against their own past harm. 2-3 sentences, consistent with the characters chosen so far.",
  },
  subplot_comingOfAge: {
    label: "Coming of Age Arc",
    hint: "How the coming-of-age thread plays out.",
    aiInstruction: "Generate distinct COMING OF AGE subplot arcs for this story — identity and power maturing together as the protagonist grows into themselves. 2-3 sentences.",
  },
  openingScene: {
    label: "Opening Scene",
    hint: "A few paragraphs of prose to kick the story off.",
    aiInstruction: "Write a short opening scene for this high-fantasy story, grounded in the specific World Bible details chosen so far.",
  },

  subplot_mystery: {
    label: "Mystery Arc",
    hint: "How the mystery thread plays out.",
    aiInstruction: "Generate distinct MYSTERY/INVESTIGATION subplot arcs for this story — a hidden truth about the world, a death, or the magic system itself, uncovered alongside the main plot. 2-3 sentences.",
  },
};

// Metadata for the subplot picker UI (separate from CATEGORY_META since
// picking a subplot type is a multi-select, not a generate/pick action).
export const SUBPLOT_TYPES = [
  {
    id: 'political',
    label: 'Political Intrigue',
    description: 'Factions, succession, betrayal, impending war — works best when it gets personal.',
  },
  {
    id: 'darkRomance',
    label: 'Dark Romance / Romantasy',
    description: 'Enemies-to-lovers, fated mates, forbidden love, a morally grey love interest.',
  },
  {
    id: 'foundFamily',
    label: 'Found Family',
    description: 'A found party or household becomes the emotional core alongside the main quest.',
  },
  {
    id: 'redemption',
    label: 'Redemption Arc',
    description: 'A character working against their own past harm — protagonist, ally, or antagonist.',
  },
  {
    id: 'comingOfAge',
    label: 'Coming of Age',
    description: 'Identity and power maturing together as the protagonist grows into themselves.',
  },
  {
    id: 'mystery',
    label: 'Mystery / Investigation',
    description: 'A hidden truth — about the world, a death, or the magic itself — uncovered in parallel.',
  },
];

export const LIBRARY = {
  premise: [
    { title: "The Dying Empire", description: "A once-boundless empire is held together only by a great magic that is visibly running out, and everyone can feel the clock ticking." },
    { title: "The Sky-Road Isles", description: "Scattered island nations are connected only by ancient floating roads of light, and no one remembers who built them." },
    { title: "The Second Moon's Return", description: "A second moon that vanished from the sky a thousand years ago is returning, and its last return ended a civilization." },
    { title: "The Bargain Kingdoms", description: "Every nation's founding treaty was signed in blood with something not quite human, and the terms are coming due." },
    { title: "The Shattered Continent", description: "A single continent was magically split into drifting fragments generations ago, each now its own strange, isolated world." },
    { title: "The Last Green Valley", description: "Civilization survives in one fertile valley ringed by a magically corrupted wasteland that swallowed everything else." },
    { title: "The Court Beneath the Roots", description: "A vast kingdom lives entirely underground beneath an ancient forest, ruled by a court that has never seen the sun." },
    { title: "The Frozen Uprising", description: "An eternal winter cast by a fallen god-king is finally beginning to thaw, and everyone is racing to claim what emerges." },
  ],
  geography: [
    { title: "Desert Kingdoms Under Twin Suns", description: "Vast dune seas broken by fortified oasis-cities, where water rights matter more than gold and nomadic clans control the trade routes." },
    { title: "The Storm-Wracked Archipelago", description: "Thousands of islands under near-constant magical storms, connected by dangerous sea routes and stranger sky-ships." },
    { title: "The Frostspine Mountains", description: "A jagged, near-impassable mountain range that splits the continent, home to isolated highland clans and buried ruins." },
    { title: "The Sunken Marshlands", description: "A vast wetland slowly reclaiming a drowned old-world civilization, thick with fog, ruins, and things that glow underwater." },
    { title: "The Verdant Empire's Heartland", description: "Rolling farmland and river valleys so fertile that whoever controls them controls everyone else's food." },
    { title: "The Glass Wastes", description: "A scarred, magic-blasted desert of fused black glass left by an ancient war, ringed by the last surviving cities." },
    { title: "The Canopy Cities", description: "Civilization exists almost entirely in the upper branches of a single, world-spanning forest, with a feared 'floor' far below." },
    { title: "The Salt Coast Cliffs", description: "A wind-battered coastline of towering cliffs and cliffside cities, built on trade with things that live in the deep water below." },
  ],
  peoples: [
    { title: "The Ash-Born Clans", description: "Humans descended from survivors of a great fire, who carry ceremonial ash-markings and hold grudges as long as memory." },
    { title: "The Hollow Folk", description: "A pale, long-lived people rumored to have no reflection, prized as advisors and mistrusted as neighbors." },
    { title: "The River-Kin", description: "Amphibious humanoids tied to a great river system, organizing life and law around its seasonal floods." },
    { title: "The Ember Dynasties", description: "Human noble houses who selectively breed for a rare fire-affinity, treating it as both birthright and burden." },
    { title: "The Wind-Walkers", description: "A nomadic winged people who never build permanent settlements, trading news and goods between grounded nations." },
    { title: "The Stonebound", description: "A slow-aging, mountain-dwelling people who can commune with rock and metal, deeply distrustful of outsiders." },
    { title: "The Split Courts", description: "Twin human kingdoms descended from one people who split over a religious schism generations ago, still technically at war." },
    { title: "The Thornkin", description: "A reclusive forest people whose bodies bond with living plant matter over their lifetime, blurring the line between person and grove." },
  ],
  originMyth: [
    { title: "The First Lie", description: "The world was sung into being by two sibling gods, until one lied to the other — and that lie became the first shadow." },
    { title: "The Weeping Titan", description: "The land itself is the body of a titan who fell from the stars and wept an ocean before going still." },
    { title: "The Broken Promise", description: "Magic entered the world when a mortal tricked a god into a bargain the god never intended to honor." },
    { title: "The Seed of Ash", description: "All living things grew from a single seed planted in the ashes of a burned heaven." },
    { title: "The Drowned Choir", description: "The first magic users were a choir of priests who drowned themselves to keep a song of protection going forever." },
    { title: "The Thief of Fire and Frost", description: "A trickster spirit stole fire from one god and frost from another, and mortals have been caught between the two ever since." },
    { title: "The Sleeping Serpent", description: "The world rests on the coiled body of a vast serpent, and every earthquake is it shifting in its sleep." },
    { title: "The Unfinished Work", description: "The gods abandoned the world mid-creation, and mortals have spent every generation since trying to finish it themselves." },
  ],
  historicalEvent: [
    { title: "The Sundering War", description: "A war between two magic-using dynasties ended with a spell that physically tore the land apart, and the fault lines are still visible." },
    { title: "The Silent Plague", description: "A magical plague stole the voices of an entire generation, and the culture still communicates partly in the sign-language born from it." },
    { title: "The Regicide of a Thousand Knives", description: "A beloved ruler was assassinated by their own council in a single night, and every noble house still denies involvement." },
    { title: "The Binding of the Wild Court", description: "A once-free order of nature-spirits was magically bound into service generations ago, and the terms of that binding are fraying." },
    { title: "The Long Winter Rebellion", description: "A decade-long famine sparked an uprising that toppled an empire and left the current fractured nations in its place." },
    { title: "The Burning of the Great Library", description: "A magical archive holding most of the world's recorded history was destroyed in one night, and no one agrees on who did it." },
    { title: "The Peace That Wasn't", description: "A famous treaty ended a century of war on paper, but the border skirmishes never actually stopped." },
    { title: "The Ascension Heresy", description: "A religious movement claiming mortals could become gods was violently suppressed, but its believers never fully disappeared." },
  ],
  government: [
    { title: "The Fractured Council of Houses", description: "Power is split between rival noble houses who each control a seat on a council that can barely agree on anything." },
    { title: "The Magocracy", description: "Only those who can wield magic may hold political office, creating a rigid hierarchy based on raw power." },
    { title: "The Theocratic Throne", description: "A ruling monarch is chosen by religious prophecy and rules with the church's authority as much as their own." },
    { title: "The Merchant Compact", description: "A alliance of trade guilds effectively runs the nation from behind a figurehead monarchy, prioritizing profit over tradition." },
    { title: "The Warlord Territories", description: "No central government exists — regional warlords hold shifting territory through strength and shaky alliances." },
    { title: "The Hereditary Empire", description: "A single ancient bloodline has ruled uninterrupted for a thousand years, and questioning that right is treason." },
    { title: "The Elected Circle", description: "Representatives are elected from each region to a ruling circle, a fragile experiment in shared power." },
    { title: "The Shadow Regency", description: "A child monarch rules in name only while a regent (or several, scheming against each other) actually holds the power." },
  ],
  magicSource: [
    { title: "A Divine Gift", description: "Magic flows from the old gods directly to those they favor, making every spellcaster a walking political statement." },
    { title: "A Natural Force", description: "Magic is simply part of the world's physics, like gravity — something to be studied and harnessed, not worshipped." },
    { title: "Bloodline Inheritance", description: "Magic passes through specific bloodlines, making noble houses and magical dynasties one and the same." },
    { title: "A Bargain With Something Old", description: "Every spell is a small transaction with an ancient, half-understood power that always expects something in return." },
    { title: "A Learned Craft", description: "Magic is a discipline anyone can study given enough time, teachers, and money — making access a matter of privilege." },
    { title: "Drawn From the Land Itself", description: "Magic is tied to specific places of power, and casters must travel to or channel through these sites to work anything significant." },
    { title: "Borrowed From the Dead", description: "Magic is drawn from the memories and will of the deceased, making necromantic ethics a constant undercurrent." },
    { title: "A Shared Dream", description: "Magic is accessed through a collective dream-space that all casters technically share, whether they like it or not." },
  ],
  magicAccess: [
    { title: "Born, Not Made", description: "Magical ability is innate and detectable from birth; those without it can never gain it, no matter how hard they try." },
    { title: "Trained From Rare Aptitude", description: "Almost anyone could theoretically learn, but only those identified with rare aptitude are ever given the training." },
    { title: "Ritual and Words", description: "Magic requires precise ritual, gesture, and spoken word — power without the correct form does nothing at all." },
    { title: "Tool-Bound", description: "Magic can only be channeled through specific enchanted tools or foci, making those objects worth killing over." },
    { title: "Outlawed But Practiced", description: "Using magic outside state sanction is illegal, pushing most practitioners into secretive, informal networks." },
    { title: "A Licensed Profession", description: "Magic use is legal but tightly licensed and taxed by the state, like any regulated trade." },
    { title: "Common and Everyday", description: "Minor magic is so common it barely registers as remarkable — it's the rare, powerful casters who draw attention." },
    { title: "Awakened by Crisis", description: "Latent magical ability only manifests when the user faces extreme danger or grief, making it unpredictable and involuntary." },
  ],
  magicCosts: [
    { title: "Physical Toll", description: "Every use of magic draws on the caster's own body — exhaustion, aging, or worse with overuse." },
    { title: "Memory Price", description: "Significant spells cost the caster a memory, chosen or random, making powerful magic genuinely dangerous to identity." },
    { title: "Emotional Resonance", description: "Magic draws its power from the caster's own emotional state, and strong magic requires — or causes — strong feeling." },
    { title: "Shared Burden", description: "The cost of a spell doesn't fall only on the caster but is spread to those magically bonded to them." },
    { title: "Cannot Create Life or Truth", description: "Magic can transform, destroy, or conceal almost anything, but it can never create genuine life or force absolute truth." },
    { title: "Diminishing Returns", description: "The same spell grows weaker each time it's cast by the same person, forcing casters to constantly diversify." },
    { title: "A Social Cost", description: "Using visible magic marks the caster in ways society can see and judge — a magical 'tell' that can't be hidden." },
    { title: "Debt to the Source", description: "Whatever magic is drawn from keeps a ledger, and eventually calls in what it's owed, on its own terms." },
  ],
  magicAttitude: [
    { title: "Revered and Central", description: "Magic is woven into daily religious and civic life — festivals, law, and status all orbit around it." },
    { title: "Feared and Suppressed", description: "Open magic use is met with suspicion or violence, a scar left by some past magical catastrophe." },
    { title: "Tightly Regulated", description: "The state treats magic like a dangerous but useful resource — licensed, taxed, and watched closely." },
    { title: "Practiced in Secret", description: "Magic survives mostly underground, in hidden circles and coded traditions passed parent to child." },
    { title: "Commodified", description: "Magic is bought, sold, and branded like any other good, with all the inequality that implies." },
    { title: "A Mark of Class", description: "Access to magic is functionally tied to wealth and status, whatever the official story claims." },
    { title: "Contested Faith", description: "Different religions or sects within the world violently disagree about whether magic is holy, blasphemous, or both." },
    { title: "Quietly Normal", description: "Most people regard magic the way we regard electricity — useful, a little mysterious, not worth getting worked up about." },
  ],

  character_protagonist: [
    { title: "Kestrel Vane", description: "A disgraced knight who lost everything defending a border no one else wanted, driven now by guilt she won't name out loud." },
    { title: "Odell Marsh", description: "A hedge-witch's apprentice who just discovered their magic is the kind their whole village was taught to fear." },
    { title: "Sable Corwin", description: "A former smuggler trying to go straight, dragged back in when the one debt they thought was settled turns out not to be." },
    { title: "Wren Ashbury", description: "The youngest child of a dying dynasty, next in line for a throne they never wanted and don't believe they can hold." },
  ],
  character_mentor: [
    { title: "Master Ilyric Vane", description: "A retired battle-mage who trains the protagonist reluctantly, still hiding the failure that ended his own career." },
    { title: "The Hollow Sister", description: "A reclusive oracle who trades true prophecy for painful personal cost, and never explains the price up front." },
    { title: "Captain Rosalind Thorne", description: "A hardened mercenary who takes the protagonist under her wing for reasons she claims are purely practical." },
    { title: "Old Marrow", description: "A trickster spirit bound to a specific grove, more interested in games than guidance, but useful all the same." },
  ],
  character_rival: [
    { title: "Ashen Vale", description: "A rival heir to the same claim as the protagonist, brilliant and furious, who can't decide whether to destroy them or stand beside them." },
    { title: "Corin Blackwood", description: "A soldier from the opposing faction who saved the protagonist's life once, an act neither of them has forgiven." },
    { title: "Lyra Duskwatch", description: "A spymaster who knows the protagonist's worst secret and hasn't decided yet whether to use it." },
    { title: "Fenwick Airedale", description: "A charming rival mage competing for the same mentor's favor, equal parts ally and threat depending on the day." },
  ],
  character_antagonist: [
    { title: "The Regent Unmasked", description: "A ruler who seized power to prevent a prophesied catastrophe, and genuinely believes the ends justify anything." },
    { title: "The Last Loyalist", description: "A general still fighting a war everyone else considers over, convinced surrender would betray everyone who already died." },
    { title: "The Hollow King", description: "A once-beloved ruler slowly consumed by the very magic that keeps his failing kingdom alive." },
    { title: "The Broker", description: "A merchant of forbidden bargains who never lies, and whose deals ruin people precisely because the terms were always fair." },
  ],

  beat_call: [
    { title: "The Border That Bled", description: "A quiet border post is destroyed overnight by something that shouldn't exist, and the protagonist is the only witness anyone believes." },
    { title: "The Letter Long Overdue", description: "A letter arrives revealing a truth about the protagonist's birth that unravels everything they thought they knew about their place in the world." },
    { title: "The Debt Called In", description: "An old favor is called in at the worst possible moment, forcing the protagonist back into a world they swore off." },
    { title: "The First Working", description: "The protagonist's magic manifests for the first time, publicly, at the worst possible moment." },
  ],
  beat_threshold: [
    { title: "Burning the Last Bridge", description: "The protagonist makes a choice that closes off any safe return to their old life — a burned bridge, literal or otherwise." },
    { title: "The Gate at the Edge of the Map", description: "The protagonist passes beyond the last place they know, into territory the old stories always warned about." },
    { title: "The Oath Sworn in Blood", description: "A binding promise is made that can't be unmade, committing the protagonist to a path with no easy way out." },
  ],
  beat_trials: [
    { title: "Allies Who Cost Something", description: "The protagonist gains a crucial ally, but only at a cost that will complicate everything later." },
    { title: "The Wrong Enemy", description: "The protagonist realizes the person they've been fighting isn't actually the source of the real threat." },
    { title: "The Test of the Old Ways", description: "The protagonist must prove themselves through a trial rooted in the world's history or magic system, and barely survives it." },
  ],
  beat_ordeal: [
    { title: "The Cost Paid in Full", description: "The magic system's price finally comes due in full, forcing an impossible sacrifice at the worst moment." },
    { title: "The Betrayal Foretold", description: "Someone the protagonist trusted completely turns out to have been working against them the whole time." },
    { title: "The Losing Battle", description: "The protagonist faces the antagonist directly and loses — decisively enough that recovery seems genuinely impossible." },
  ],
  beat_climax: [
    { title: "The Reckoning at the Old Throne", description: "The final confrontation plays out at a location tied to the world's history, forcing the past and present to collide." },
    { title: "The Price of Victory", description: "The protagonist wins, but only by paying the exact cost the magic system always demanded — no exceptions." },
    { title: "The Choice Neither Side Wanted", description: "Victory requires the protagonist to make a choice that costs them something core to who they are." },
  ],
  beat_resolution: [
    { title: "A Throne Nobody Wanted", description: "The protagonist ends up holding power they never asked for, and the story closes on what they choose to do with it." },
    { title: "The Scar That Stays", description: "The world is saved, but visibly changed — a scar, physical or magical, that becomes part of daily life going forward." },
    { title: "A Door Left Open", description: "The main conflict resolves, but one thread is deliberately left open — a sequel hook, or just an honest loose end." },
  ],

  subplot_political: [
    { title: "The Council That Won't Choose a Side", description: "A ruling council splinters over how to respond to the main conflict, and the protagonist gets pulled into the maneuvering against their will." },
    { title: "The Marriage of Convenience", description: "A political alliance is proposed that would solve the kingdom's problems and devastate the protagonist's personal life in the same stroke." },
    { title: "The Loyalist's Dilemma", description: "An ally the protagonist trusts is quietly working for a faction with very different goals, and has to choose a side before the end." },
  ],
  subplot_darkRomance: [
    { title: "Bound Against Their Will", description: "A magical bond ties the protagonist to their rival whether either of them wants it, and neither can fully trust the pull they feel." },
    { title: "The Enemy Who Saved Them", description: "The protagonist owes their life to someone on the opposing side, and the debt curdles into something neither will admit out loud." },
    { title: "The Vow That Should Have Been Impossible", description: "Two people bound by opposing loyalties fall into something neither can afford, and the story never lets them forget the cost." },
  ],
  subplot_foundFamily: [
    { title: "The Company of the Unwanted", description: "A ragtag group thrown together by circumstance slowly becomes the protagonist's real home, in ways their birth family never was." },
    { title: "The Debt of Belonging", description: "The protagonist is taken in by strangers who ask nothing in return, and it unsettles them more than any threat has." },
    { title: "Kin By Choice", description: "As blood ties fail the protagonist one by one, a new, chosen family quietly forms around them without anyone announcing it." },
  ],
  subplot_redemption: [
    { title: "Undoing What Can't Be Undone", description: "A character spends the story trying to fix a harm they caused, only to learn some of it can only be lived with, not fixed." },
    { title: "The Second Chance No One Asked For", description: "A former enemy is given a chance to prove they've changed, and the protagonist has to decide whether to believe it." },
    { title: "Paying It Forward", description: "A character atones not by fixing their original mistake, but by protecting someone else from making the same one." },
  ],
  subplot_comingOfAge: [
    { title: "Outgrowing the Old Rules", description: "The protagonist starts the story defined by someone else's expectations and has to figure out, painfully, what they actually believe." },
    { title: "The Power They Didn't Ask For", description: "As the protagonist's abilities grow, so does the responsibility, and they have to decide who they'll be once they can't hide behind being young anymore." },
    { title: "The Mirror of the Mentor", description: "The protagonist starts to see uncomfortable echoes of their mentor in themselves, and has to choose which parts to keep." },
  ],
  subplot_mystery: [
    { title: "The Question Under the Question", description: "A seemingly small unanswered detail from early in the story turns out to unravel the true shape of the main conflict." },
    { title: "Who Really Signed the Treaty", description: "A historical document at the center of the world's politics turns out to have been forged, and someone has been protecting that secret for generations." },
    { title: "The Body That Shouldn't Be There", description: "A death early in the story doesn't add up, and pulling that thread leads somewhere far more dangerous than expected." },
  ],
};
