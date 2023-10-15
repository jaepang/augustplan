import os
import re

# read index.tsx
with open(os.path.join(os.path.dirname(__file__), 'index.tsx'), 'r') as f:
    index_tsx = f.read()
    # replace -[a-z] with -[A-Z]
    index_tsx = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), index_tsx)
    # write to index2.tsx
    with open(os.path.join(os.path.dirname(__file__), 'index2.tsx'), 'w') as f2:
        f2.write(index_tsx)