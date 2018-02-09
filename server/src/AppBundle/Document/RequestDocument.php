<?php

namespace AppBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * @MongoDB\Document(collection="requests")
 */
class RequestDocument
{
    /**
     * @MongoDB\Id(strategy="UUID")
     */
    protected $id;

    /**
     * @MongoDB\Field(type="string")
     */
    protected $link;

    /**
     * @MongoDB\Field(type="date")
     */
    protected $createdAt;

    /**
     * @MongoDB\Field(type="string")
     */
    protected $status;

    /**
     * @MongoDB\Field(type="raw")
     */
    protected $units;

    /**
     * @MongoDB\Field(type="boolean")
     */
    protected $modified;

    /**
     * @MongoDB\Field(type="boolean")
     */
    protected $moving;

    /**
     * @MongoDB\Field(type="raw")
     */
    protected $chain;

    /**
     * Get id
     *
     * @return custom_id $id
     */
    public function getId()
    {
        return $this->id;
    }

    public function __construct() {
        $this->createdAt = new \Datetime();
        $this->status = "created";
    }

    /**
     * Set link
     *
     * @param string $link
     * @return self
     */
    public function setLink($link)
    {
        $this->link = $link;
        return $this;
    }

    /**
     * Get link
     *
     * @return string $link
     */
    public function getLink()
    {
        return $this->link;
    }

    /**
     * Set createdAt
     *
     * @param date $createdAt
     * @return self
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    /**
     * Get createdAt
     *
     * @return date $createdAt
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set status
     *
     * @param string $status
     * @return self
     */
    public function setStatus($status)
    {
        $this->status = $status;
        return $this;
    }

    /**
     * Get status
     *
     * @return string $status
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set units
     *
     * @param raw $units
     * @return self
     */
    public function setUnits($units)
    {
        $this->units = $units;
        return $this;
    }

    /**
     * Get units
     *
     * @return raw $units
     */
    public function getUnits()
    {
        return $this->units;
    }

    /**
     * Set modified
     *
     * @param boolean $modified
     * @return self
     */
    public function setModified($modified)
    {
        $this->modified = $modified;
        return $this;
    }

    /**
     * Get modified
     *
     * @return boolean $modified
     */
    public function getModified()
    {
        return $this->modified;
    }

    /**
     * Set moving
     *
     * @param boolean $moving
     * @return self
     */
    public function setMoving($moving)
    {
        $this->moving = $moving;
        return $this;
    }

    /**
     * Get moving
     *
     * @return boolean $moving
     */
    public function getMoving()
    {
        return $this->moving;
    }

    /**
     * Set chain
     *
     * @param string $chain
     * @return self
     */
    public function setChain($chain)
    {
        $this->chain = $chain;
        return $this;
    }

    /**
     * Get chain
     *
     * @return string $chain
     */
    public function getChain()
    {
        return $this->chain;
    }
}
