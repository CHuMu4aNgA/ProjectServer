import { Fact } from '../models/Fact.js'

class FactService {

    async getAllFacts() {
        const facts = await Fact.findAll({
            order: [['id', 'DESC']]
        })
        return facts
    }
    
    async getFact(factId) {
        const fact = await Fact.findOne({ where: { id: factId } })
        return fact
    }

    async createFact(userId, title, text, img) {
        const newFact = await Fact.create({
            userId,
            title,
            text,
            img
        })
        return newFact
    }

    async deleteFact(factId) {
        const factData = await Fact.destroy({where: {id: factId}})
        return factData
    }
    
    async updateFact(factId, title, text, img) {
        const updatedFact = await Fact.update(
          { title, text, img },
          { where: { id: factId }, returning: true }
        )
        const factUpdated = updatedFact[1][0].get()
        return factUpdated
    }
}

export const factService = new FactService()