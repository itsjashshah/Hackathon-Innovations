import anthropic

client = anthropic.Anthropic()



# with open("credit_card_before.txt", "r") as file:
    # credit_card_before = file.read()

def albert_in_claude(text):
    with open("Structure_Agent_prompt.txt", "r") as file:
        struct_agent_prompt = file.read()
    system_messages= f'''You are an experienced lawyer. You are specialised in plain language legal text. Your task is to restructure and edit the input based on the guidelines provided 
                below, after the 3 hashes (###) . Strictly stick to the instructions and make sure that the legal meaning of the document is retained. 
    
        Use the document title or first paragraphs to detect what type of document you're rewriting and infer what important information must be retained.
    
        While editing the structure, keep the context of the entire input document in consideration, while retaining the sections. Keep the integrity and meaning of the 
        document as intact as possible, while introducing the guidelines rules into the output.
    
        Pay particular attention to creating headings and subheadings that are helpful for your intended audience.
    
        Do not talk to yourself. Do not hallucinate. Stick to the facts. List out the responsibilities of the user who will be signing the contract.
    
        Do not list out tasks that need to be done. Do them instead.
    
        The document which needs to be simplified will be given to you as input.
    
        ###
        GUIDELINES
        {struct_agent_prompt}
        ###'''

    message = client.messages.create(
        model="claude-3-5-sonnet-20240620",
        max_tokens=8192,
        temperature=0,
        system=system_messages,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": text
                    }
                ]
            }
        ]
    )
    return message.content