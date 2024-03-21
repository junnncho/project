import random

def googoofinder(columns,rows,bombs):
    
    grid = [[0 for num in range (columns)] for num in range(rows)]

    loop_count = 0
    while loop_count < bombs:
        x = random.randint(0, columns - 1)
        y = random.randint(0, rows - 1)

        if grid[y][x] == 0:
            grid[y][x] = 'B'
            loop_count = loop_count + 1

        if grid[y][x] == 'B':
            pass

    pos_x = 0
    pos_y = 0
    while pos_x * pos_y < columns * rows and pos_y < rows:
        adj_sum = 0
        for (adj_y, adj_x) in [(0,1),(0,-1),(1,0),(-1,0),(1,1),(-1,1),(1,-1),(-1,-1)]:
            try:
                if grid[adj_y + pos_y][adj_x + pos_x] == 'B' and adj_y + pos_y > -1 and adj_x + pos_x > -1:
                    adj_sum = adj_sum + 1
            except Exception as error:
                pass
        if grid[pos_y][pos_x] != 'B':
            grid[pos_y][pos_x] = adj_sum

        if pos_x == columns - 1:
            pos_x = 0
            pos_y = pos_y + 1
        else:
            pos_x = pos_x + 1

    string_builder = []
    for the_rows in grid:
        string_builder.append(''.join(map(str, the_rows)))
    string_builder = '\n'.join(string_builder)

    string_builder = string_builder.replace('0', '||:zero:||')
    string_builder = string_builder.replace('1', '||:one:||')
    string_builder = string_builder.replace('2', '||:two:||')
    string_builder = string_builder.replace('3', '||:three:||')
    string_builder = string_builder.replace('4', '||:four:||')
    string_builder = string_builder.replace('5', '||:five:||')
    string_builder = string_builder.replace('6', '||:six:||')
    string_builder = string_builder.replace('7', '||:seven:||')
    string_builder = string_builder.replace('8', '||:eight:||')
    final = string_builder.replace('B', '||<:7_:1004054861882609674>||')

    percentage = columns * rows
    percentage = bombs / percentage
    percentage = 100 * percentage
    percentage = round(percentage, 2)
    return final,percentage