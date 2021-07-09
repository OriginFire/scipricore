const dialogue = [
    {
        type: "initial",
        participant: "Are you enjoying the views from Titan? It must be quite a step down from your\n" +
            "plaza back at Antioch... but as a most wanted criminal I expect you didn't\n" +
            " have much of a choice.",
        responses: {
            required: "all",
            prerequisite: [
                {
                    asked: false,
                    response: "Who are you?",
                    printout: "",
                    autorebuttal: true,
                    rebuttal: "I'm like you, Ulysses. A ghost in the machine.\n" +
                        "An outlaw. And just like you, most of the people I deal with come to resent me."
                },
                {
                    asked: false,
                    response: "How do you know me?",
                    printout: "",
                    autorebuttal: true,
                    rebuttal: "It's my business to know you, Ulysses. It's my business\n" +
                    "to watch, and listen. When the sun rises on Neptune I'm there. When it sets on\n" +
                    "Earth, I'm there. And when a low-life conman runs a hustle to re-route food shipments headed for outpost colonies, I'm there too."
                },
            ],
            unlocked: [
                {
                    response: "You're the reason my operation was busted?",
                    printout: "You're the reason my operation was busted... the reason I was nearly junked by\n" +
                        "Mars Code Enforcement on my burn out of Antioch.",
                    autorebuttal: false,
                    rebuttal: "guilty"
                }
            ]
        }
    },
    {
        type: "guilty",
        participant: "Guilty.",
        followUp: "You must have a death wish reaching out to me directly.",
        participantFollowup: "Now now. No idle threats.",
        responses: {
            required: "one",
            unlocked: [
                {
                    response: "I'm going to kill you.",
                    printout: "",
                    autorebuttal: false,
                    rebuttal: "shame",
                },
                {
                    response: "It wasn't an idle threat.",
                    printout: "",
                    autorebuttal: false,
                    rebuttal: "shame",
                },
                {
                    response: "Why not?",
                    printout: "",
                    autorebuttal: false,
                    rebuttal: "explanation",
                }
            ]
        }
    },
    {
        type: "shame",
        participant: "See I can tell that's an idle threat because you just lost most of your\n" +
            "wealth and worldly possessions by my hand. And while I know exactly\n" +
            "who--and where--you are, the only reason you even know I exist is because I\n" +
            "found you.",
        responses: {
            required: "one",
            unlocked: [
                {
                    response: "What do you want?",
                    printout: "Why don't you get around to what it is you want?",
                    autorebuttal: false,
                    rebuttal: "shame",
                },
            ]
        }
    },
    {
        type: "explanation",
        participant: "Your recent misfortunes left you utterly dispossessed -- I happen to know \n" +
            "you're not a threat to anyone for the moment. The problem with making threats \n" +
            "from your situation is they either embarrass you or invite a response you'd not survive.",
        responses: {
            required: "one",
            unlocked: [
                {
                    response: "What do you want?",
                    printout: "Why don't you get around to what it is you want?",
                    autorebuttal: false,
                    rebuttal: "last",
                },
            ]
        }
    },

    {
        type: "last",
        participant: "I want you to know that I'm here, I have the ability to ruin you and if I \n" +
            "catch you stealing food from colonists again, I will. I'll make sure\n" +
            "you get junked wherever you run in this system. My name is Dalton, Ulysses,\n" +
            "and I'm always watching."
    }
];

export default dialogue;